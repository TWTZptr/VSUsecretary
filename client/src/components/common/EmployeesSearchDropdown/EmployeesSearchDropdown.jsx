import React from 'react';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { Box } from '@mui/system';
import { CommonTextField } from '../CommonTextField';
import { EmployeesSearchDropdownItem } from './EmployeesSearchDropdownItem';

export const EmployeesSearchDropdown = React.memo(
  ({ selectedEmployee, onSelectEmployee, label, disabled }) => {
    const { employees } = useEmployeesStore((state) => state);
    const [text, setText] = React.useState('');
    const [dropdownHidden, setDropdownHidden] = React.useState(true);

    const filteredEmployees = React.useMemo(
      () =>
        employees.filter((employee) =>
          `${employee.name} ${employee.lastname} ${employee.patronymic}`.includes(
            text
          )
        ),
      [text, employees]
    );

    const onChange = React.useCallback((event) => {
      setText(event.target.value);
    }, []);

    const onSelect = React.useCallback(
      (employee) => {
        setText(`${employee.name} ${employee.lastname} ${employee.patronymic}`);
        setDropdownHidden(true);
        onSelectEmployee(employee);
      },
      [setText, onSelectEmployee, setDropdownHidden]
    );

    const onTextAreaClick = React.useCallback(() => {
      setDropdownHidden(false);
    }, [setDropdownHidden, setText]);

    const closeDropdownOnClickOutside = React.useCallback(() => {
      setDropdownHidden(true);
    }, []);

    React.useEffect(() => {
      if (dropdownHidden) {
        document.removeEventListener('click', closeDropdownOnClickOutside);
      } else {
        document.addEventListener('click', closeDropdownOnClickOutside);
      }
    }, [dropdownHidden, closeDropdownOnClickOutside]);

    return (
      <Box sx={React.useMemo(() => ({ width: 'auto' }), [])}>
        <CommonTextField
          label={label}
          id={label}
          onChange={onChange}
          value={text}
          disabled={disabled}
          onClick={onTextAreaClick}
        />
        <Box
          sx={React.useMemo(
            () => ({
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: '100',
              width: '25%',
              visibility: dropdownHidden ? 'hidden' : 'visible',
              opacity: dropdownHidden ? '0' : '1',
              transition: 'opacity 0.1s ease-out',
              border: 'solid 1px',
            }),
            [dropdownHidden]
          )}
        >
          {filteredEmployees.map((employee) => {
            return (
              <EmployeesSearchDropdownItem
                id={employee.id}
                key={employee.id}
                employee={employee}
                onClick={onSelect}
              />
            );
          })}
        </Box>
      </Box>
    );
  }
);

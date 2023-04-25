import React from 'react';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { EmployeesSearchDropdownItem } from './EmployeesSearchDropdownItem';
import { ModalAddEmployee } from '../../Tabs/employees/ModalAddEmployee';
import { CustomSearchDropdown } from '../SearchDropdown/CustomSearchDropdown';
import { Box } from '@mui/system';
import { ModalEditExtraInfo } from '../../Tabs/graduateScripts/ModalEditExtraInfo/ModalEditExtraInfo';

export const EmployeesSearchDropdown = React.memo(
  ({
    selectedEmployee,
    onSelectEmployee,
    label,
    disabled,
    exclude,
    onDeleteEmployee,
  }) => {
    const { employees } = useEmployeesStore((state) => state);

    const employeeTextFormatter = React.useCallback(
      (employee) =>
        `${employee.name} ${employee.lastname} ${employee.patronymic}`,
      []
    );

    const employeesFilterCallback = React.useCallback(
      (text) => {
        let availableEmployees = employees;

        if (exclude && exclude.length) {
          availableEmployees = employees.filter(
            (emp) => !exclude.some((e) => e.id === emp.id)
          );
        }

        if (!text.length) {
          return availableEmployees;
        }

        return availableEmployees.filter((employee) =>
          `${employee.name} ${employee.lastname} ${employee.patronymic}`
            .toLowerCase()
            .includes(text.toLowerCase())
        );
      },
      [employees, exclude]
    );

    return (
      <Box sx={React.useMemo(() => ({ marginTop: '10px' }), [])}>
        <CustomSearchDropdown
          disabled={disabled}
          onSelect={onSelectEmployee}
          ItemComponent={EmployeesSearchDropdownItem}
          label={label}
          ModalCreateComponent={ModalAddEmployee}
          selectedItem={selectedEmployee}
          textFormatter={employeeTextFormatter}
          itemsCallback={employeesFilterCallback}
          onDelete={onDeleteEmployee}
          ModalEditExtraInfoComponent={ModalEditExtraInfo}
        />
      </Box>
    );
  }
);

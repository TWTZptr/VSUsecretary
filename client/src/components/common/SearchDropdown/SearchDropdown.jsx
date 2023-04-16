import React from 'react';
import { Box } from '@mui/system';
import { CommonTextField } from '../CommonTextField';
import { EmployeesSearchDropdownAdd } from '../EmployeesSearchDropdown/EmployeesSearchDropdownAdd';
import { CommonModal } from '../CommonModal';
import { useModal } from '../../../hooks/useModal';

export const SearchDropdown = React.memo(
  ({ items, label, disabled, ItemComponent, onSelect, ModalComponent }) => {
    const [text, setText] = React.useState('');
    const [dropdownHidden, setDropdownHidden] = React.useState(true);
    const [modalActive, activateModal, inactivateModal] = useModal();

    const onTextAreaClick = React.useCallback(() => {
      setDropdownHidden(false);
    }, [setDropdownHidden]);

    const onTextChange = React.useCallback((event) => {
      setText(event.target.value);
    }, []);

    return (
      <Box sx={React.useMemo(() => ({ width: 'auto' }), [])}>
        <CommonTextField
          label={label}
          id={label}
          onChange={onTextChange}
          value={text}
          disabled={disabled}
          onClick={onTextAreaClick}
          sx={React.useMemo(() => ({ width: '350px' }), [])}
          variant="standard"
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
          {items.map((employee) => {
            return (
              <ItemComponent
                id={employee.id}
                key={employee.id}
                employee={employee}
                onClick={onSelect}
              />
            );
          })}
          <EmployeesSearchDropdownAdd onClick={activateModal} />
        </Box>
        <CommonModal active={modalActive} onClose={inactivateModal}>
          <ModalComponent onClose={inactivateModal} />
        </CommonModal>
      </Box>
    );
  }
);

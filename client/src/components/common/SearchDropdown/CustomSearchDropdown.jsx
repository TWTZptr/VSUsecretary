import React from 'react';
import { Box } from '@mui/system';
import { EmployeesSearchDropdownAdd } from '../EmployeesSearchDropdown/EmployeesSearchDropdownAdd';
import { CommonModal } from '../CommonModal';
import { useModal } from '../../../hooks/useModal';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

export const CustomSearchDropdown = React.memo(
  ({
    label,
    disabled,
    ItemComponent,
    onSelect,
    onDelete,
    ModalCreateComponent,
    selectedItem,
    ModalEditExtraInfoComponent,
    textFormatter,
    itemsCallback,
  }) => {
    const [text, setText] = React.useState('');
    const [dropdownHidden, setDropdownHidden] = React.useState(true);
    const [createModalActive, activateCreateModal, inactivateCreateModal] =
      useModal();
    const [editModalActive, activateEditModal, inactivateEditModal] =
      useModal();

    const items = React.useMemo(
      () => itemsCallback(text),
      [itemsCallback, text]
    );

    const onTextAreaClick = React.useCallback(() => {
      setDropdownHidden(false);
    }, [setDropdownHidden]);

    const onTextChange = React.useCallback((event) => {
      setText(event.target.value);
    }, []);

    const closeDropdownOnClickOutside = React.useCallback(() => {
      setDropdownHidden(true);
    }, []);

    React.useEffect(() => {
      if (selectedItem && selectedItem.id) {
        setText(textFormatter(selectedItem));
      } else {
        setText('');
      }
    }, [selectedItem, textFormatter]);

    React.useEffect(() => {
      if (dropdownHidden) {
        document.removeEventListener('click', closeDropdownOnClickOutside);
      } else {
        document.addEventListener('click', closeDropdownOnClickOutside);
      }
    }, [dropdownHidden, closeDropdownOnClickOutside]);

    const onOpenModal = React.useCallback(
      () => selectedItem.id && activateEditModal(),
      [selectedItem.id, activateEditModal]
    );

    const onDeleteItem = React.useCallback(
      () => selectedItem.id && onDelete(selectedItem),
      [onDelete, selectedItem]
    );

    const buttonsDisabled = !selectedItem.id;

    return (
      <Box sx={React.useMemo(() => ({ width: 'auto' }), [])}>
        <Box
          sx={React.useMemo(
            () => ({
              display: 'flex',
              flexDirection: 'row',
            }),
            []
          )}
        >
          <TextField
            label={label}
            id={label}
            onChange={onTextChange}
            value={text}
            disabled={disabled}
            onClick={onTextAreaClick}
            sx={React.useMemo(
              () => ({ width: '60%', margin: '0 10px', minWidth: '300px' }),
              []
            )}
            variant="standard"
          />
          <FormatAlignJustifyIcon
            sx={React.useMemo(
              () => ({
                marginTop: '20px',
                backgroundColor: 'white',
                zIndex: '1',
                opacity: disabled || buttonsDisabled ? '0.2' : '',
                ':hover':
                  disabled || buttonsDisabled
                    ? ''
                    : {
                        cursor: 'pointer',
                        backgroundColor: '#f5f5f5',
                      },
              }),
              [disabled, buttonsDisabled]
            )}
            onClick={onOpenModal}
          />
          <CloseIcon
            sx={React.useMemo(
              () => ({
                marginTop: '20px',
                backgroundColor: 'white',
                zIndex: '1',
                opacity: disabled || buttonsDisabled ? '0.2' : '',
                ':hover':
                  disabled || buttonsDisabled
                    ? ''
                    : {
                        cursor: 'pointer',
                        backgroundColor: '#f5f5f5',
                      },
              }),
              [disabled, buttonsDisabled]
            )}
            onClick={onDeleteItem}
          />
        </Box>
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
          <EmployeesSearchDropdownAdd onClick={activateCreateModal} />
        </Box>
        <CommonModal active={createModalActive} onClose={inactivateCreateModal}>
          <ModalCreateComponent onClose={inactivateCreateModal} />
        </CommonModal>
        <CommonModal active={editModalActive} onClose={inactivateEditModal}>
          <ModalEditExtraInfoComponent
            onClose={inactivateEditModal}
            selectedId={selectedItem.id}
          />
        </CommonModal>
      </Box>
    );
  }
);

import React from 'react';
import { Box } from '@mui/system';
import { EmployeesSearchDropdownAdd } from '../EmployeesSearchDropdown/EmployeesSearchDropdownAdd';
import { CommonModal } from '../CommonModal';
import { useModal } from '../../../hooks/useModal';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import EmailIcon from '@mui/icons-material/Email';
import { toastError, toastSuccessful } from '../../../utils/toastSender';
import { getMailMessageText } from '../../../utils/getMailMessageText';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { validateEmailMessageData } from '../../Tabs/graduateScripts/EmployeesTab/validators';

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
    const {
      graduateScripts,
      selectedGraduateScript,
      secretary,
      time,
      audience,
    } = useGraduateScriptsStore((state) => state);

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

    const buttonsDisabled = !selectedItem.id;

    const onOpenModal = React.useCallback(
      () =>
        selectedItem.id && !disabled && !buttonsDisabled && activateEditModal(),
      [selectedItem.id, activateEditModal, disabled, buttonsDisabled]
    );

    const onDeleteItem = React.useCallback(
      () =>
        selectedItem.id &&
        !disabled &&
        !buttonsDisabled &&
        onDelete(selectedItem),
      [onDelete, selectedItem, disabled, buttonsDisabled]
    );

    const onCopyMessageText = React.useCallback(async () => {
      if (!selectedItem.id) {
        return;
      }

      try {
        validateEmailMessageData({
          time,
          audience,
          directionId: selectedGraduateScript.direction.id,
        });
      } catch (err) {
        toastError(err.message);
        return;
      }

      const dates = graduateScripts.map((gs) => new Date(Date.parse(gs.date)));
      await navigator.clipboard.writeText(
        getMailMessageText(
          selectedItem,
          dates,
          selectedGraduateScript.direction,
          secretary,
          time,
          audience
        )
      );
      toastSuccessful('Текст скопирован в буффер обмена');
    }, [
      selectedItem,
      graduateScripts,
      selectedGraduateScript.direction,
      secretary,
      audience,
      time,
    ]);

    const itemsSx = React.useMemo(
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
    );

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
          <EmailIcon sx={itemsSx} onClick={onCopyMessageText} />
          <FormatAlignJustifyIcon sx={itemsSx} onClick={onOpenModal} />
          <CloseIcon sx={itemsSx} onClick={onDeleteItem} />
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
          <ModalCreateComponent
            onClose={inactivateCreateModal}
            onAddCallback={onSelect}
          />
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

import { EditorInputBlock } from '../../common/EditorInputBlock';
import { Box } from '@mui/material';
import { CommonTextField } from '../../common/CommonTextField';
import React from 'react';

export const EmployeeEditor = (props) => {
  const handleEmployeeNameChange = React.useCallback(
    (event) => props.handlers.setName(event.target.value),
    [props.handlers]
  );

  const handleEmployeeLastnameChange = React.useCallback(
    (event) => props.handlers.setLastname(event.target.value),
    [props.handlers]
  );

  const handleEmployeePatronymicChange = React.useCallback(
    (event) => props.handlers.setPatronymic(event.target.value),
    [props.handlers]
  );

  const handleEmailChange = React.useCallback(
    (event) => props.handlers.setEmail(event.target.value),
    [props.handlers]
  );

  const handlePhoneNumberChange = React.useCallback(
    (event) => props.handlers.setPhoneNumber(event.target.value),
    [props.handlers]
  );

  const flexGrow1Sx = React.useMemo(() => ({ flexGrow: 1 }), []);

  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Фамилия"
          id="lastname"
          onChange={handleEmployeeLastnameChange}
          value={props.localEmployee.lastname}
          disabled={props.disabled}
        />
        <CommonTextField
          label="Имя"
          id="name"
          onChange={handleEmployeeNameChange}
          value={props.localEmployee.name}
          disabled={props.disabled}
        />
        <CommonTextField
          label="Отчество"
          id="patronymic"
          onChange={handleEmployeePatronymicChange}
          value={props.localEmployee.patronymic}
          disabled={props.disabled}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <CommonTextField
          label="Email"
          id="email"
          onChange={handleEmailChange}
          value={props.localEmployee.email}
          disabled={props.disabled}
          sx={flexGrow1Sx}
        />
        <CommonTextField
          label="Телефон"
          id="phoneNumber"
          onChange={handlePhoneNumberChange}
          value={props.localEmployee.phoneNumber}
          disabled={props.disabled}
          sx={flexGrow1Sx}
        />
      </EditorInputBlock>
    </Box>
  );
};

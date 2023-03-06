import { EditorInputBlock } from '../../common/EditorInputBlock';
import { Box } from '@mui/material';
import { CommonTextField } from '../../common/CommonTextField';
import React from 'react';
import {
  AVAILABLE_ACADEMIC_DEGREES,
  AVAILABLE_ACADEMIC_RANKS,
  AVAILABLE_EMPLOYEE_STATUSES,
} from '../../../constants';
import { PlainSelector } from '../../common/selectors/PlainSelector';

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

  const handlePositionChange = React.useCallback(
    (event) => props.handlers.setPosition(event.target.value),
    [props.handlers]
  );

  const handleAnotherJobChange = React.useCallback(
    (event) => props.handlers.setAnotherJob(event.target.value),
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

  const lastLineSx = React.useMemo(
    () => ({
      width: 200,
    }),
    []
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
          label="Должность"
          id="position"
          onChange={handlePositionChange}
          value={props.localEmployee.position}
          disabled={props.disabled}
        />
        <CommonTextField
          label="Второе место работы"
          id="anotherJob"
          onChange={handleAnotherJobChange}
          value={props.localEmployee.anotherJob}
          disabled={props.disabled}
          sx={flexGrow1Sx}
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
      <EditorInputBlock>
        <PlainSelector
          name="Ученое звание"
          values={AVAILABLE_ACADEMIC_RANKS}
          onChange={props.handlers.setAcademicRank}
          disabled={props.disabled}
          sx={lastLineSx}
          value={props.localEmployee.academicRank}
        />
        <PlainSelector
          name="Ученая степень"
          values={AVAILABLE_ACADEMIC_DEGREES}
          onChange={props.handlers.setAcademicDegree}
          disabled={props.disabled}
          sx={lastLineSx}
          value={props.localEmployee.academicDegree}
        />
        <PlainSelector
          name="Статус"
          values={AVAILABLE_EMPLOYEE_STATUSES}
          onChange={props.handlers.setStatus}
          disabled={props.disabled}
          sx={lastLineSx}
          value={props.localEmployee.status}
        />
      </EditorInputBlock>
    </Box>
  );
};

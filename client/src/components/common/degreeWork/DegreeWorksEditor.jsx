import { EditorInputBlock } from '../EditorInputBlock';
import { Box } from '@mui/system';
import {
  INITIAL_EMPLOYEE_STATE,
  INITIAL_GRADUATE_SCRIPT_STATE,
  INITIAL_STUDENT_STATE,
} from '../../../constants';
import { CommonTextField } from '../CommonTextField';
import React from 'react';
import { MarkSelector } from '../selectors/MarkSelector';
import { StudentSelector } from '../selectors/StudentSelector';
import { EmployeeSelector } from '../selectors/EmplopyeeSelector';
import { TakeDaySelector } from '../selectors/TakeDaySelector';
import { ImplementationSwitch } from '../../Tabs/degreeWorks/ImplementationSwitch';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';

export const DegreeWorksEditor = React.memo((props) => {
  const { students } = useStudentsStore((state) => state);
  const { employees } = useEmployeesStore((state) => state);
  const { graduateScripts } = useGraduateScriptsStore((state) => state);

  const student = React.useMemo(
    () =>
      students.find(
        (student) => student.id === props.localDegreeWork.studentId
      ) || INITIAL_STUDENT_STATE,
    [students, props.localDegreeWork.studentId]
  );

  const takeDay = React.useMemo(
    () =>
      graduateScripts.find(
        (takeDay) => takeDay.id === props.localDegreeWork.takeDayId
      ) || INITIAL_GRADUATE_SCRIPT_STATE,
    [graduateScripts, props.localDegreeWork.takeDayId]
  );

  const reviewer = React.useMemo(
    () =>
      employees.find(
        (employee) => employee.id === props.localDegreeWork.reviewerId
      ) || INITIAL_EMPLOYEE_STATE,
    [employees, props.localDegreeWork.reviewerId]
  );

  const supervisor = React.useMemo(
    () =>
      employees.find(
        (employee) => employee.id === props.localDegreeWork.supervisorId
      ) || INITIAL_EMPLOYEE_STATE,
    [employees, props.localDegreeWork.supervisorId]
  );

  const handleThemeChange = React.useCallback(
    (event) => props.handlers.setTheme(event.target.value),
    [props.handlers]
  );

  const handlePagesNumberChange = React.useCallback(
    (event) => props.handlers.setPagesNumber(event.target.value),
    [props.handlers]
  );

  const handleOriginalityChange = React.useCallback(
    (event) => props.handlers.setOriginality(event.target.value),
    [props.handlers]
  );

  const handleStudentChange = React.useCallback(
    (event) => props.handlers.setStudentId(event.target.value),
    [props.handlers]
  );

  const handleSupervisorChange = React.useCallback(
    (event) => props.handlers.setSupervisorId(event.target.value),
    [props.handlers]
  );

  const handleReviewerChange = React.useCallback(
    (event) => props.handlers.setReviewerId(event.target.value),
    [props.handlers]
  );

  const handleTakeDayChange = React.useCallback(
    (event) => props.handlers.setTakeDayId(event.target.value),
    [props.handlers]
  );

  const handleImplementationChange = React.useCallback(
    () =>
      props.handlers.setImplementation(!props.localDegreeWork.implementation),
    [props.localDegreeWork.implementation, props.handlers]
  );

  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Тема"
          id="theme"
          onChange={handleThemeChange}
          value={props.localDegreeWork.theme}
          disabled={props.disabled}
          sx={React.useMemo(() => ({ flexGrow: 1, minWidth: '500px' }), [])}
        />
      </EditorInputBlock>
      <EditorInputBlock sx={{ alignItems: 'center' }}>
        <CommonTextField
          label="Количество страниц"
          id="pagesNumber"
          onChange={handlePagesNumberChange}
          value={props.localDegreeWork.pagesNumber}
          disabled={props.disabled}
          sx={React.useMemo(() => ({ flexGrow: 1, width: '150px' }), [])}
        />
        <CommonTextField
          label="Оригинальность"
          id="originality"
          onChange={handleOriginalityChange}
          value={props.localDegreeWork.originality}
          disabled={props.disabled}
          sx={React.useMemo(() => ({ flexGrow: 1, width: '150px' }), [])}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <StudentSelector
          students={students}
          student={student}
          disabled={props.disabled}
          onChange={handleStudentChange}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <EmployeeSelector
          employees={employees}
          employee={supervisor}
          disabled={props.disabled}
          onChange={handleSupervisorChange}
          label="Научный руководитель"
        />
        <MarkSelector
          label="Оценка"
          onChange={props.handlers.setSupervisorMark}
          disabled={props.disabled}
          value={props.localDegreeWork.supervisorMark || ''}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <EmployeeSelector
          employees={employees}
          employee={reviewer}
          disabled={props.disabled}
          onChange={handleReviewerChange}
          label="Рецензент"
        />
        <MarkSelector
          label="Оценка"
          onChange={props.handlers.setReviewerMark}
          disabled={props.disabled}
          value={props.localDegreeWork.reviewerMark || ''}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <TakeDaySelector
          takeDays={graduateScripts}
          takeDay={takeDay}
          disabled={props.disabled}
          onChange={handleTakeDayChange}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <ImplementationSwitch
          onChange={handleImplementationChange}
          checked={props.localDegreeWork.implementation}
          label="Внедрение"
          disabled={props.disabled}
        />
      </EditorInputBlock>
    </Box>
  );
});

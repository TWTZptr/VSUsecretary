import { EditorInputBlock } from '../EditorInputBlock';
import { Box } from '@mui/system';
import {
  INITIAL_EMPLOYEE_STATE,
  INITIAL_STUDENT_STATE,
} from '../../../constants';
import { CommonTextField } from '../CommonTextField';
import React from 'react';
import { MarkSelector } from '../selectors/MarkSelector';
import { StudentSelector } from '../selectors/StudentSelector';
import { EmployeeSelector } from '../selectors/EmployeeSelector';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';
import { formatPerson } from '../../../helpers/formatters';
import { Checkbox, FormControlLabel } from '@mui/material';

const sx40 = {
  width: '40%',
};

const sx30 = {
  width: '30%',
};

const implementationSx = {
  'aria-label': 'controlled',
};

const marginLeftSx = {
  marginLeft: '10px',
};

export const DegreeWorksEditor = React.memo(
  ({
    localDegreeWork,
    handlers,
    disabled,
    editStudent,
    publications,
    publicationsHandler,
  }) => {
    const { students } = useStudentsStore((state) => state);
    const { employees } = useEmployeesStore((state) => state);

    const student = React.useMemo(
      () =>
        students.find((student) => student.id === localDegreeWork.studentId) ||
        INITIAL_STUDENT_STATE,
      [students, localDegreeWork.studentId]
    );

    const unusedStudents = React.useMemo(
      () => students.filter((s) => !s.degreeWork || s.id === student.id),
      [students, student.id]
    );

    const supervisor = React.useMemo(
      () =>
        employees.find(
          (employee) => employee.id === localDegreeWork.supervisorId
        ) || INITIAL_EMPLOYEE_STATE,
      [employees, localDegreeWork.supervisorId]
    );

    const handleThemeChange = React.useCallback(
      (event) => handlers.setTheme(event.target.value),
      [handlers]
    );

    const handlePagesNumberChange = React.useCallback(
      (event) => handlers.setPagesNumber(event.target.value),
      [handlers]
    );

    const handleOriginalityChange = React.useCallback(
      (event) => handlers.setOriginality(event.target.value),
      [handlers]
    );

    const handleStudentChange = React.useCallback(
      (event) => handlers.setStudentId(event.target.value),
      [handlers]
    );

    const handleSupervisorChange = React.useCallback(
      (event) => handlers.setSupervisorId(event.target.value),
      [handlers]
    );

    const handleReviewerChange = React.useCallback(
      (event) => handlers.setReviewer(event.target.value),
      [handlers]
    );

    const handleImplementationChange = React.useCallback(
      () => handlers.setImplementation(!localDegreeWork.implementation),
      [localDegreeWork.implementation, handlers]
    );

    return (
      <Box>
        <EditorInputBlock>
          <CommonTextField
            label="Тема"
            id="theme"
            onChange={handleThemeChange}
            value={localDegreeWork.theme}
            disabled={disabled}
            sx={React.useMemo(() => ({ flexGrow: 1, minWidth: '500px' }), [])}
          />
        </EditorInputBlock>
        <EditorInputBlock sx={{ alignItems: 'center' }}>
          {editStudent ? (
            <StudentSelector
              students={unusedStudents}
              student={student}
              disabled={disabled}
              onChange={handleStudentChange}
              sx={sx40}
            />
          ) : (
            <CommonTextField
              label="Студент"
              id="student"
              value={formatPerson(student)}
              disabled
              sx={sx40}
            />
          )}
          <CommonTextField
            label="Количество страниц"
            id="pagesNumber"
            onChange={handlePagesNumberChange}
            value={localDegreeWork.pagesNumber}
            disabled={disabled}
            sx={sx30}
          />
          <CommonTextField
            label="Оригинальность"
            id="originality"
            onChange={handleOriginalityChange}
            value={localDegreeWork.originality}
            disabled={disabled}
            sx={sx30}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <EmployeeSelector
            employees={employees}
            employee={supervisor}
            disabled={disabled}
            onChange={handleSupervisorChange}
            label="Научный руководитель"
          />
          <MarkSelector
            label="Оценка"
            onChange={handlers.setSupervisorMark}
            disabled={disabled}
            value={localDegreeWork.supervisorMark || ''}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <CommonTextField
            label="Рецензент"
            id="reviewer"
            onChange={handleReviewerChange}
            value={localDegreeWork.reviewer}
            disabled={disabled}
            sx={React.useMemo(() => ({ flexGrow: 1, minWidth: '500px' }), [])}
          />
          <MarkSelector
            label="Оценка"
            onChange={handlers.setReviewerMark}
            disabled={disabled}
            value={localDegreeWork.reviewerMark || ''}
          />
        </EditorInputBlock>
        {publicationsHandler ? (
          <EditorInputBlock>
            <CommonTextField
              label="Количество публикаций"
              id="publications"
              onChange={publicationsHandler}
              value={publications || ''}
              disabled={disabled}
              sx={sx30}
            />
          </EditorInputBlock>
        ) : (
          ''
        )}
        <EditorInputBlock>
          <FormControlLabel
            control={
              <Checkbox
                checked={localDegreeWork.implementation}
                onChange={handleImplementationChange}
                inputProps={implementationSx}
                disabled={disabled}
              />
            }
            label="Внедрение"
            sx={marginLeftSx}
          />
        </EditorInputBlock>
      </Box>
    );
  }
);

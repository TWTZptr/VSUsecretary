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
import { ImplementationSwitch } from '../../Tabs/degreeWorks/ImplementationSwitch';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';

export const DegreeWorksEditor = React.memo(
  ({ localDegreeWork, handlers, disabled }) => {
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
          <CommonTextField
            label="Количество страниц"
            id="pagesNumber"
            onChange={handlePagesNumberChange}
            value={localDegreeWork.pagesNumber}
            disabled={disabled}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '150px' }), [])}
          />
          <CommonTextField
            label="Оригинальность"
            id="originality"
            onChange={handleOriginalityChange}
            value={localDegreeWork.originality}
            disabled={disabled}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '150px' }), [])}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <StudentSelector
            students={unusedStudents}
            student={student}
            disabled={disabled}
            onChange={handleStudentChange}
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
        <EditorInputBlock>
          <ImplementationSwitch
            onChange={handleImplementationChange}
            checked={localDegreeWork.implementation}
            label="Внедрение"
            disabled={disabled}
          />
        </EditorInputBlock>
      </Box>
    );
  }
);

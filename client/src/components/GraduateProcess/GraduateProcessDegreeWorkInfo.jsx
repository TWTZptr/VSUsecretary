import React from 'react';
import { Box } from '@mui/system';
import { MarkSelector } from '../common/selectors/MarkSelector';
import { EditorInputBlock } from '../common/EditorInputBlock';
import { CommonTextField } from '../common/CommonTextField';
import { EmployeeSelector } from '../common/selectors/EmployeeSelector';
import { useGraduateProcessStore } from '../../hooks/zustand/useGraduateProcessStore';
import { useEmployeesStore } from '../../hooks/zustand/useEmployeesStore';
import { INITIAL_EMPLOYEE_STATE } from '../../constants';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

const authorSx = {
  width: '5%',
};

const checkboxSx = {
  'aria-label': 'controlled',
};

export const GraduateProcessDegreeWorkInfo = React.memo(
  ({ localDegreeWork, handlers, onDegreeWorkSave }) => {
    const { graduateProcessEmployees, selectedStudent, updateSelectedStudent } =
      useGraduateProcessStore((state) => state);
    const { employees } = useEmployeesStore((state) => state);

    const onBlur = React.useCallback(async () => {
      await onDegreeWorkSave();
    }, [onDegreeWorkSave]);

    const firstQuestionAuthor = React.useMemo(
      () =>
        employees.find(
          (employee) => employee.id === localDegreeWork.firstQuestionAuthorId
        ) || INITIAL_EMPLOYEE_STATE,
      [employees, localDegreeWork.firstQuestionAuthorId]
    );

    const secondQuestionAuthor = React.useMemo(
      () =>
        employees.find(
          (employee) => employee.id === localDegreeWork.secondQuestionAuthorId
        ) || INITIAL_EMPLOYEE_STATE,
      [employees, localDegreeWork.secondQuestionAuthorId]
    );

    const commissionEmployees = [
      graduateProcessEmployees.secretary,
      graduateProcessEmployees.chairman,
      ...graduateProcessEmployees.commission,
    ];

    const handleFirstQuestionChange = React.useCallback(
      (event) => {
        handlers.setFirstQuestion(event.target.value);
      },
      [handlers]
    );

    const handleHonorChange = React.useCallback(async () => {
      updateSelectedStudent({ honor: !selectedStudent.honor });
    }, [updateSelectedStudent, selectedStudent.honor]);

    const handleSecondQuestionChange = React.useCallback(
      (event) => {
        handlers.setSecondQuestion(event.target.value);
      },
      [handlers]
    );

    const handleNotesChange = React.useCallback(
      (event) => {
        handlers.setNotes(event.target.value);
      },
      [handlers]
    );

    const handleSummaryChange = React.useCallback(
      (event) => {
        handlers.setSummary(event.target.value);
      },
      [handlers]
    );

    const handleFirstQuestionAuthorIdChange = React.useCallback(
      (event) => {
        handlers.setFirstQuestionAuthorId(event.target.value);
      },
      [handlers]
    );

    const handleSecondQuestionAuthorIdChange = React.useCallback(
      (event) => {
        handlers.setSecondQuestionAuthorId(event.target.value);
      },
      [handlers]
    );

    const disabled = !localDegreeWork.id;

    console.log(selectedStudent);

    return (
      <Box sx={React.useMemo(() => ({ flexGrow: '1', width: '50%' }), [])}>
        <EditorInputBlock>
          <CommonTextField
            label="Первый вопрос"
            id="firstQuestion"
            onChange={handleFirstQuestionChange}
            value={localDegreeWork.firstQuestion}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '40%' }), [])}
            disabled={disabled}
            onBlur={onBlur}
          />
          <EmployeeSelector
            employees={commissionEmployees}
            employee={firstQuestionAuthor}
            onChange={handleFirstQuestionAuthorIdChange}
            label="Спрашивающий"
            sx={authorSx}
            disabled={disabled}
            onBlur={onBlur}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <CommonTextField
            label="Второй вопрос"
            id="secondQuestion"
            onChange={handleSecondQuestionChange}
            value={localDegreeWork.secondQuestion}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '40%' }), [])}
            disabled={disabled}
            onBlur={onBlur}
          />
          <EmployeeSelector
            employees={commissionEmployees}
            employee={secondQuestionAuthor}
            onChange={handleSecondQuestionAuthorIdChange}
            label="Спрашивающий"
            sx={authorSx}
            disabled={disabled}
            onBlur={onBlur}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <CommonTextField
            label="Замечания"
            id="notes"
            onChange={handleNotesChange}
            value={localDegreeWork.notes}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '40%' }), [])}
            disabled={disabled}
            onBlur={onBlur}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <CommonTextField
            label="Общая характеристика"
            id="summary"
            onChange={handleSummaryChange}
            value={localDegreeWork.summary}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '40%' }), [])}
            disabled={disabled}
            onBlur={onBlur}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <MarkSelector
            label="Оценка"
            onChange={handlers.setMarkId}
            value={localDegreeWork.markId || ''}
            disabled={disabled}
            onBlur={onBlur}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedStudent.honor}
                onChange={handleHonorChange}
                inputProps={checkboxSx}
                disabled={disabled}
              />
            }
            label="Диплом с отличием"
          />
        </EditorInputBlock>
      </Box>
    );
  }
);

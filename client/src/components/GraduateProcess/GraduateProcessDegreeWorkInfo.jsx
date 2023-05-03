import React from 'react';
import { Box } from '@mui/system';
import { MarkSelector } from '../common/selectors/MarkSelector';
import { EditorInputBlock } from '../common/EditorInputBlock';
import { CommonTextField } from '../common/CommonTextField';
import { EmployeeSelector } from '../common/selectors/EmployeeSelector';
import { useGraduateProcessStore } from '../../hooks/zustand/useGraduateProcessStore';
import { useEmployeesStore } from '../../hooks/zustand/useEmployeesStore';
import { INITIAL_EMPLOYEE_STATE } from '../../constants';

const authorSx = {
  width: '5%',
};

export const GraduateProcessDegreeWorkInfo = React.memo(
  ({ localDegreeWork, handlers }) => {
    const { graduateProcessEmployees } = useGraduateProcessStore(
      (state) => state
    );
    const { employees } = useEmployeesStore((state) => state);

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
    console.log(commissionEmployees);

    return (
      <Box sx={React.useMemo(() => ({ flexGrow: '1' }), [])}>
        <EditorInputBlock>
          <CommonTextField
            label="Первый вопрос"
            id="firstQuestion"
            onChange={handleFirstQuestionChange}
            value={localDegreeWork.firstQuestion}
            sx={React.useMemo(() => ({ flexGrow: 1, width: '40%' }), [])}
            disabled={disabled}
          />
          <EmployeeSelector
            employees={commissionEmployees}
            employee={firstQuestionAuthor}
            onChange={handleFirstQuestionAuthorIdChange}
            label="Спрашивающий"
            sx={authorSx}
            disabled={disabled}
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
          />
          <EmployeeSelector
            employees={commissionEmployees}
            employee={secondQuestionAuthor}
            onChange={handleSecondQuestionAuthorIdChange}
            label="Спрашивающий"
            sx={authorSx}
            disabled={disabled}
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
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <MarkSelector
            label="Оценка"
            onChange={handlers.setMark}
            value={localDegreeWork.mark || ''}
            disabled={disabled}
          />
        </EditorInputBlock>
      </Box>
    );
  }
);

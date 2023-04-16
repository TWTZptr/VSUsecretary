import React from 'react';
import { DegreeWorksEditor } from '../../../../common/degreeWork/DegreeWorksEditor';
import { Box } from '@mui/system';
import { MarkSelector } from '../../../../common/selectors/MarkSelector';
import { CommonTextField } from '../../../../common/CommonTextField';
import { GRADUATION_INITIAL_STATE } from '../../../../../constants';
import { EndGraduationButton } from './EndGraduationButton';
import { useSelector } from 'react-redux';
import { EmployeeSelector } from '../../../../common/selectors/EmployeeSelector';

export const GraduationEditor = React.memo((props) => {
  const allGraduations = props.allGraduations;
  const [currentGraduation, setCurrentGraduation] = React.useState(
    GRADUATION_INITIAL_STATE
  );

  React.useEffect(() => {
    if (props.degreeWork.id) {
      setCurrentGraduation(allGraduations.current.get(props.degreeWork.id));
    }
  }, [props.degreeWork.id]);

  const disabled = !Boolean(props.degreeWork.id);

  const { commission } = useSelector(
    (state) => state.ui.selectedTakeDayInfo.employees
  );

  const onMarkChange = React.useCallback(
    (newMark) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const newGraduationInfo = {
        ...prev,
        mark: newMark,
      };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  const onFirstQuestionChange = React.useCallback(
    (event) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const text = event.target.value;
      const newGraduationInfo = { ...prev, first: text };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  const onFirstQuestionAuthorChange = React.useCallback(
    (event) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const id = event.target.value;
      const employee = commission.find((employee) => employee.id === id);
      const newGraduationInfo = { ...prev, firstAuthor: employee };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  const onSecondQuestionAuthorChange = React.useCallback(
    (event) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const id = event.target.value;
      const employee = commission.find((employee) => employee.id === id);
      const newGraduationInfo = { ...prev, secondAuthor: employee };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  const onSecondQuestionChange = React.useCallback(
    (event) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const text = event.target.value;
      const newGraduationInfo = { ...prev, second: text };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  const onOverviewChange = React.useCallback(
    (event) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const text = event.target.value;
      const newGraduationInfo = { ...prev, overview: text };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  const onRemarksChange = React.useCallback(
    (event) => {
      const prev = allGraduations.current.get(props.degreeWork.id);
      const text = event.target.value;
      const newGraduationInfo = { ...prev, remarks: text };
      allGraduations.current.set(props.degreeWork.id, newGraduationInfo);
      setCurrentGraduation(newGraduationInfo);
    },
    [props.degreeWork.id]
  );

  return (
    <Box
      sx={React.useMemo(() => ({ display: 'flex', flexDirection: 'row' }), [])}
    >
      <Box>
        <DegreeWorksEditor
          localDegreeWork={props.degreeWork}
          handlers={props.degreeWorkHandlers}
          disabled
        />
        <EndGraduationButton
          allGraduations={allGraduations}
          onClick={props.onEnd}
        />
      </Box>

      <Box
        sx={React.useMemo(
          () => ({ width: '100%', maxWidth: '700px', textAlign: 'left' }),
          []
        )}
      >
        <Box sx={React.useMemo(() => ({ display: 'flex' }), [])}>
          <CommonTextField
            label="Вопрос 1"
            id="question1"
            onChange={onFirstQuestionChange}
            value={currentGraduation.first}
            disabled={disabled}
            sx={React.useMemo(() => ({ width: '100%' }), [])}
          />
          <EmployeeSelector
            sx={React.useMemo(() => ({ width: '50%' }), [])}
            employees={commission}
            employee={currentGraduation.firstAuthor}
            disabled={disabled}
            onChange={onFirstQuestionAuthorChange}
            label="Спрашивающий"
          />
        </Box>
        <Box sx={React.useMemo(() => ({ display: 'flex' }), [])}>
          <CommonTextField
            label="Вопрос 2"
            id="question2"
            onChange={onSecondQuestionChange}
            value={currentGraduation.second}
            disabled={disabled}
            sx={React.useMemo(() => ({ width: '100%' }), [])}
          />
          <EmployeeSelector
            sx={React.useMemo(() => ({ width: '50%' }), [])}
            employees={commission}
            employee={currentGraduation.secondAuthor}
            disabled={disabled}
            onChange={onSecondQuestionAuthorChange}
            label="Спрашивающий"
          />
        </Box>
        <Box sx={React.useMemo(() => ({ display: 'flex' }), [])}>
          <CommonTextField
            label="Общая характеристика"
            id="overview"
            onChange={onOverviewChange}
            value={currentGraduation.overview}
            disabled={disabled}
            sx={React.useMemo(() => ({ width: '100%' }), [])}
          />
        </Box>
        <Box sx={React.useMemo(() => ({ display: 'flex' }), [])}>
          <CommonTextField
            label="Замечания"
            id="remarks"
            onChange={onRemarksChange}
            value={currentGraduation.remarks}
            disabled={disabled}
            sx={React.useMemo(() => ({ width: '100%' }), [])}
          />
        </Box>
        <Box sx={React.useMemo(() => ({ textAlign: 'left' }), [])}>
          <MarkSelector
            label="Оценка ГЭК"
            onChange={onMarkChange}
            disabled={disabled}
            value={currentGraduation.mark}
            sx={React.useMemo(() => ({ minWidth: '150px' }), [])}
          />
        </Box>
      </Box>
    </Box>
  );
});

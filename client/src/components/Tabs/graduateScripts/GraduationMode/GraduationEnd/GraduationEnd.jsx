import { Box } from '@mui/system';
import React from 'react';
import { DegreeWorksList } from './DegreeWorksList';
import { ProtocolGeneratorButton } from './ProtocolGeneratorButton';
import { CommonTextField } from '../../../../common/CommonTextField';
import { StudentsListGenerationButton } from './StudentsListGenerationButton';
import { CommonButton } from '../../../../common/CommonButton';
import { stopTakeDay } from '../../../../../redux/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { MarksShortListGenerationButton } from './MarksShortListGenerationButton';
import { MarksFullListGenerationButton } from '../../MarksFullListGenerationButton';

export const GraduationEnd = React.memo((props) => {
  const [number, setNumber] = React.useState('');

  const onNumberChange = React.useCallback((event) => {
    const number = event.target.value;
    setNumber(number);
  }, []);

  const dispatch = useDispatch();

  const onClose = React.useCallback(() => {
    dispatch(stopTakeDay());
  }, [dispatch]);

  return (
    <Box sx={React.useMemo(() => ({ textAlign: 'left', width: '100%' }), [])}>
      <Typography
        sx={React.useMemo(
          () => ({
            fontSize: '1.5rem',
            fontWeight: '400',
          }),
          []
        )}
      >
        Результаты
      </Typography>
      <DegreeWorksList
        degreeWorks={props.degreeWorks}
        graduations={props.allGraduations}
        number={number}
      />
      <Box>
        <CommonTextField
          label="Номер протокола"
          id="number"
          onChange={onNumberChange}
          value={number}
        />
        <ProtocolGeneratorButton disabled={number === ''} number={number} />
        <MarksShortListGenerationButton
          degreeWorks={props.degreeWorks}
          graduationsInfo={props.allGraduations}
        />
      </Box>
      <Box sx={React.useMemo(() => ({ marginTop: '15px' }), [])}>
        <CommonButton onClick={onClose}>Закрыть</CommonButton>
      </Box>
    </Box>
  );
});

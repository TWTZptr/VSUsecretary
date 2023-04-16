import { Box } from '@mui/system';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import React from 'react';
import { DegreeWorksList } from './DegreeWorksList/DegreeWorksList';
import { EmployeesList } from './EmployeesList';
import DangerousButton from '../../common/DangerousButton';
import { CommonButton } from '../../common/CommonButton';
import { AddGraduateScriptPopover } from './AddGraduateScriptPopover';
import { MarksFullListGenerationButton } from './MarksFullListGenerationButton';
import { toastError } from '../../../utils/toastSender';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useCommonStore } from '../../../hooks/zustand/commonStore';

export const GraduateScriptEditor = ({ disabled }) => {
  const {
    removeGraduateScript,
    selectedGraduateScript,
    updateGraduateScript,
    commission,
    chairman,
    secretary,
    degreeWorks,
  } = useGraduateScriptsStore((state) => state);
  const { startGraduateScript } = useCommonStore((state) => state);

  const onDateChange = React.useCallback(
    (date) => {
      updateGraduateScript({ ...selectedGraduateScript, date });
    },
    [selectedGraduateScript, updateGraduateScript]
  );

  const startTakeDayHandler = React.useCallback(() => {
    if (
      !degreeWorks.filter(
        (degreeWork) => degreeWork.takeDayId === selectedGraduateScript.id
      ).length
    ) {
      toastError('Не добавлено ни одной работы!');
      return;
    }

    const commissionLength = commission.reduce(
      (prev, curr) => (prev + curr.id ? 1 : 0),
      0
    );

    if (!chairman.id || !secretary.id || commissionLength < 3) {
      toastError('Не указан(ы) председатель/секретарь/член комиссии');
      return;
    }

    startGraduateScript(selectedGraduateScript);
  }, [
    degreeWorks,
    chairman,
    secretary,
    commission,
    startGraduateScript,
    selectedGraduateScript,
  ]);

  const onDeleteGraduateScript = React.useCallback(() => {
    removeGraduateScript(selectedGraduateScript.id);
  }, [removeGraduateScript, selectedGraduateScript.id]);

  return (
    <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
      <EditorInputBlock>
        <Box sx={React.useMemo(() => ({ width: 'auto', margin: 'auto' }), [])}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['day', 'month']}
              label="Дата сдачи"
              value={selectedGraduateScript.date}
              onChange={onDateChange}
              renderInput={(params) => (
                <TextField
                  onKeyDown={(event) => event.preventDefault()}
                  {...params}
                />
              )}
              disabled={disabled}
            />
          </LocalizationProvider>
        </Box>
      </EditorInputBlock>
      <DegreeWorksList />
      <EditorInputBlock>
        <Box
          sx={React.useMemo(
            () => ({
              display: 'flex',
              flexDirection: 'row',
              marginTop: '20px',
            }),
            []
          )}
        >
          <EmployeesList disabled={disabled} />
        </Box>
      </EditorInputBlock>
      <EditorInputBlock>
        <MarksFullListGenerationButton disabled={disabled} />
      </EditorInputBlock>
      <EditorInputBlock>
        <CommonButton onClick={startTakeDayHandler} disabled={disabled}>
          Начать защиту
        </CommonButton>
      </EditorInputBlock>
      <EditorInputBlock>
        <Box>
          <AddGraduateScriptPopover />
          <DangerousButton onClick={onDeleteGraduateScript} disabled={disabled}>
            Удалить
          </DangerousButton>
        </Box>
      </EditorInputBlock>
    </Box>
  );
};

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
import { INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE } from '../../../constants';

export const GraduateScriptEditor = ({ disabled, localGraduateScript }) => {
  const { removeGraduateScript, selectedGraduateScript, updateGraduateScript } =
    useGraduateScriptsStore((state) => state);
  const { startGraduateScript } = useCommonStore((state) => state);

  const onDateChange = React.useCallback(
    (date) => {
      updateGraduateScript({ ...selectedGraduateScript, date });
    },
    [selectedGraduateScript, updateGraduateScript]
  );

  const degreeWorks = [];
  const employees = INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE;
  const selectedTakeDay = {};

  const startTakeDayHandler = React.useCallback(() => {
    if (
      !degreeWorks.filter(
        (degreeWork) => degreeWork.takeDayId === localGraduateScript.id
      ).length
    ) {
      toastError('Не добавлено ни одной работы!');
      return;
    }

    const commissionLength = employees.commission.reduce(
      (prev, curr) => (prev + curr.id ? 1 : 0),
      0
    );

    if (!employees.chairman || !employees.secretary || commissionLength < 3) {
      toastError('Не указан(ы) председатель/секретарь/член комиссии');
      return;
    }

    startGraduateScript(selectedTakeDay);
  }, [
    selectedTakeDay.id,
    degreeWorks,
    localGraduateScript,
    employees.chairman,
    employees.secretary,
    employees.commission,
    startGraduateScript,
    selectedTakeDay,
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
              value={localGraduateScript.date}
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

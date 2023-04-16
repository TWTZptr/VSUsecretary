import { Box } from '@mui/system';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Tab, Tabs, TextField } from '@mui/material';
import DangerousButton from '../../common/DangerousButton';
import { CommonButton } from '../../common/CommonButton';
import { AddGraduateScriptPopover } from './AddGraduateScriptPopover';
import { toastError } from '../../../utils/toastSender';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useCommonStore } from '../../../hooks/zustand/commonStore';
import React from 'react';
import { CurrentGraduateScriptTab } from './CurrentGraduateScriptTab';

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
  const [currentTab, setCurrentTab] = React.useState(1);

  const onTabChange = React.useCallback(
    (e, newTab) => {
      setCurrentTab(newTab);
    },
    [setCurrentTab]
  );

  const { setCurrentYear } = useCommonStore((state) => state);

  const onDateChange = React.useCallback(
    (date) => {
      if (!date) {
        return;
      }

      setCurrentYear(date.getFullYear());
      updateGraduateScript({ ...selectedGraduateScript, date });
    },
    [selectedGraduateScript, updateGraduateScript, setCurrentYear]
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
              label="Дата сдачи"
              value={selectedGraduateScript.date}
              onChange={onDateChange}
              renderInput={(params) => (
                <TextField
                  onKeyDown={(event) => event.preventDefault()}
                  {...params}
                />
              )}
              for
              disabled={disabled}
            />
          </LocalizationProvider>
        </Box>
      </EditorInputBlock>
      <Box
        sx={React.useMemo(
          () => ({ display: 'flex', justifyContent: 'center' }),
          []
        )}
      >
        <Tabs value={currentTab} onChange={onTabChange}>
          <Tab label="Состав комиссии" />
          <Tab label="Студенты" />
        </Tabs>
      </Box>
      <CurrentGraduateScriptTab disabled={disabled} index={currentTab} />
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

import { Box } from '@mui/system';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Tab, Tabs, TextField, Typography } from '@mui/material';
import DangerousButton from '../../common/DangerousButton';
import { CommonButton } from '../../common/CommonButton';
import { AddGraduateScriptPopover } from './AddGraduateScriptPopover';
import { toastError } from '../../../utils/toastSender';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useCommonStore } from '../../../hooks/zustand/useCommonStore';
import React from 'react';
import { CurrentGraduateScriptTab } from './CurrentGraduateScriptTab';
import { generateProtocolDoc } from '../../../services/docsService';
import { saveAs } from 'file-saver';

const completedGraduateScriptTextSx = {
  fontSize: '20px',
};

export const GraduateScriptEditor = ({ disabled }) => {
  const {
    removeGraduateScript,
    selectedGraduateScript,
    updateGraduateScript,
    commission,
    chairman,
    secretary,
    students,
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

  const onGenerateProtocol = React.useCallback(async () => {
    const res = await generateProtocolDoc(selectedGraduateScript.id);
    const [year, month, day] = selectedGraduateScript.date.split('-');
    const filename = `Протокол ${day}.${month}.${year}.docx`;
    saveAs(res.data, filename);
  }, [selectedGraduateScript.id, selectedGraduateScript.date]);

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
    const commissionLength = commission.reduce(
      (prev, curr) => prev + (curr.id ? 1 : 0),
      0
    );

    if (!chairman.id || !secretary.id || commissionLength < 3) {
      toastError('Не указан(ы) председатель/секретарь/член комиссии');
      return;
    }

    if (!students.length) {
      toastError('Не добавлено ни одного студента!');
      return;
    }

    if (students.some((student) => !student.degreeWork)) {
      toastError('У одного или нескольких студентов отсутствуют данные о ВКР');
      return;
    }

    startGraduateScript(selectedGraduateScript);
  }, [
    chairman,
    secretary,
    commission,
    startGraduateScript,
    selectedGraduateScript,
    students,
  ]);

  const onDeleteGraduateScript = React.useCallback(() => {
    removeGraduateScript(selectedGraduateScript.id);
  }, [removeGraduateScript, selectedGraduateScript.id]);

  return (
    <Box sx={React.useMemo(() => ({ width: '100%', textAlign: 'left' }), [])}>
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
      <Box
        sx={React.useMemo(
          () => ({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }),
          []
        )}
      >
        {selectedGraduateScript.complete ? (
          <Typography sx={completedGraduateScriptTextSx}>
            Сценарий защиты завершен
          </Typography>
        ) : (
          <CommonButton onClick={startTakeDayHandler} disabled={disabled}>
            Начать защиту
          </CommonButton>
        )}
        <CommonButton
          disabled={!selectedGraduateScript.id}
          onClick={onGenerateProtocol}
        >
          Протокол
        </CommonButton>
      </Box>
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

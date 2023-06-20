import { Box } from '@mui/system';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import DangerousButton from '../../common/DangerousButton';
import { CommonButton } from '../../common/CommonButton';
import { AddGraduateScriptPopover } from './AddGraduateScriptPopover';
import { toastError } from '../../../utils/toastSender';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useCommonStore } from '../../../hooks/zustand/useCommonStore';
import React from 'react';
import { CurrentGraduateScriptTab } from './CurrentGraduateScriptTab';
import {
  generateMarksShortList,
  generateProtocolDoc,
  generateQualificationList,
  generateStudentListing,
  generateStudentsPassports,
} from '../../../services/docsService';
import { saveAs } from 'file-saver';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';

const completedGraduateScriptTextSx = {
  fontSize: '20px',
};

const flexCenterSx = {
  display: 'flex',
  justifyContent: 'center',
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
    resetSelectedGraduateScript,
    setAudience,
    setTime,
  } = useGraduateScriptsStore((state) => state);
  const { startGraduateScript, currentYear } = useCommonStore((state) => state);
  const [currentTab, setCurrentTab] = React.useState(1);
  const { directions } = useDirectionsStore((state) => state);
  const [localTime, setLocalTime] = React.useState('');
  const [localAudience, setLocalAudience] = React.useState('');

  React.useEffect(() => {
    setLocalTime(selectedGraduateScript.time);
    setLocalAudience(selectedGraduateScript.audience);
  }, [selectedGraduateScript.time, selectedGraduateScript.audience]);

  const onDirectionIdChange = React.useCallback(
    (event) => {
      updateGraduateScript({
        ...selectedGraduateScript,
        directionId: event.target.value,
      });
    },
    [updateGraduateScript, selectedGraduateScript]
  );

  const onTabChange = React.useCallback(
    (e, newTab) => {
      setCurrentTab(newTab);
    },
    [setCurrentTab]
  );

  const { setCurrentYear } = useCommonStore((state) => state);

  const onGenerateProtocol = React.useCallback(async () => {
    if (!chairman.id || !secretary.id || commission.length < 5) {
      toastError('Не полностью указан состав коммиссии');
      return;
    }

    if (!selectedGraduateScript.directionId) {
      toastError('Не указано направление');
      return;
    }

    const res = await generateProtocolDoc(selectedGraduateScript.id);
    const [year, month, day] = selectedGraduateScript.date.split('-');
    const filename = `Протокол ${day}.${month}.${year}.docx`;
    saveAs(res.data, filename);
  }, [
    chairman.id,
    secretary.id,
    selectedGraduateScript.directionId,
    commission,
    selectedGraduateScript.id,
    selectedGraduateScript.date,
  ]);

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

    if (!chairman.id || !secretary.id || commissionLength < 5) {
      toastError('Не указан(ы) председатель/секретарь/член(ы) комиссии');
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

    if (!selectedGraduateScript.directionId) {
      toastError('Не указано направление');
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
    resetSelectedGraduateScript();
  }, [
    removeGraduateScript,
    selectedGraduateScript.id,
    resetSelectedGraduateScript,
  ]);

  const onTimeChange = React.useCallback(
    (e) => {
      setLocalTime(e.target.value);
    },
    [setLocalTime]
  );

  const onAudienceChange = React.useCallback(
    (e) => {
      setLocalAudience(e.target.value);
    },
    [setLocalAudience]
  );

  const onTimeSet = React.useCallback(() => {
    setTime(localTime);
  }, [localTime, setTime]);

  const onAudienceSet = React.useCallback(() => {
    setAudience(localAudience);
  }, [localAudience, setAudience]);

  const onGenerateMarksShortList = React.useCallback(async () => {
    const res = await generateMarksShortList(selectedGraduateScript.id);
    const direction = directions.find(
      (d) => d.id === selectedGraduateScript.directionId
    );
    const filename = `Оценочный лист ${direction.shortName}.docx`;
    saveAs(res.data, filename);
  }, [selectedGraduateScript, directions]);

  const onGenerateStudentListing = React.useCallback(async () => {
    const direction = directions.find(
      (d) => d.id === selectedGraduateScript.directionId
    );
    const res = await generateStudentListing(currentYear, direction.id);
    const filename = `Список студентов ${currentYear} ${direction.shortName}.docx`;
    saveAs(res.data, filename);
  }, [directions, currentYear, selectedGraduateScript.directionId]);

  const onStudentsPassportsGenerate = React.useCallback(async () => {
    if (!students.length) {
      toastError('Не добавлено ни одного студента!');
      return;
    }

    if (
      students.some(
        (student) =>
          !student.degreeWork?.theme ||
          !student.degreeWork?.pagesNumber ||
          !student.degreeWork?.originality ||
          !student.degreeWork?.supervisorId ||
          !student.degreeWork?.supervisorMark ||
          !student.publications
      )
    ) {
      toastError(
        'У одного или нескольких студентов не полностью указаны данные о ВКР'
      );
      return;
    }

    const res = await generateStudentsPassports(selectedGraduateScript.id);
    const filename = `Паспорта студентов ${selectedGraduateScript.date}.docx`;
    saveAs(res.data, filename);
  }, [selectedGraduateScript.date, selectedGraduateScript.id, students]);

  const onGenerateQualificationList = React.useCallback(async () => {
    const res = await generateQualificationList(selectedGraduateScript.id);
    const filename = `Приложение о квалификации ${selectedGraduateScript.date}.docx`;
    saveAs(res.data, filename);
  }, [selectedGraduateScript.date, selectedGraduateScript.id]);

  return (
    <Box sx={React.useMemo(() => ({ width: '100%', textAlign: 'left' }), [])}>
      <Box sx={flexCenterSx}>
        <Box
          sx={React.useMemo(() => ({ width: 'auto', textAlign: 'left' }), [])}
        >
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
              disabled={disabled}
            />
          </LocalizationProvider>
        </Box>
        <FormControl
          sx={React.useMemo(() => ({ width: '40%', marginLeft: '20px' }), [])}
          disabled={disabled}
        >
          <InputLabel>Направление</InputLabel>
          <Select
            label="Направление"
            onChange={onDirectionIdChange}
            value={selectedGraduateScript.directionId || ''}
          >
            {directions.map((direction) => (
              <MenuItem value={direction.id} key={direction.id}>
                {direction.code} {direction.shortName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={React.useMemo(() => ({ marginLeft: '20px' }), [])}
          label="Время"
          id="time"
          onChange={onTimeChange}
          value={localTime}
          disabled={disabled}
          onBlur={onTimeSet}
        />
        <TextField
          sx={React.useMemo(() => ({ marginLeft: '20px' }), [])}
          label="Аудитория"
          id="audience"
          onChange={onAudienceChange}
          value={localAudience}
          disabled={disabled}
          onBlur={onAudienceSet}
        />
      </Box>
      <Box sx={flexCenterSx}>
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
          Протокол заседания
        </CommonButton>
        <CommonButton
          disabled={!selectedGraduateScript.id}
          onClick={onStudentsPassportsGenerate}
        >
          Карточки студентов
        </CommonButton>
        {selectedGraduateScript.complete ? (
          <>
            <CommonButton onClick={onGenerateMarksShortList}>
              Оценочный лист
            </CommonButton>
            <CommonButton onClick={onGenerateStudentListing}>
              Список студентов
            </CommonButton>
            <CommonButton onClick={onGenerateQualificationList}>
              Приложение о квалификации
            </CommonButton>
          </>
        ) : (
          ''
        )}
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

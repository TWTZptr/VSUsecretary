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
import { AddTakeDayPopover } from './AddTakeDayPopover';
import { MarksFullListGenerationButton } from './MarksFullListGenerationButton';
import { toastError } from '../../../utils/toastSender';
import { INITIAL_TAKE_DAY_STATE } from '../../../constants';

export const TakeDayEditor = (props) => {
  // const selectedTakeDay = useSelector(
  //   (state) => state.ui.selectedTakeDayInfo.takeDay
  // );

  // const { degreeWorks } = useSelector((state) => state);
  // const { employees } = useSelector((state) => state.ui.selectedTakeDayInfo);
  const degreeWorks = [];
  const employees = [];
  const selectedTakeDay = {};

  const startTakeDayHandler = React.useCallback(() => {
    if (
      !degreeWorks.filter(
        (degreeWork) => degreeWork.takeDayId === props.localTakeDay.id
      ).length
    ) {
      toastError('Не добавлено ни одной работы!');
      return;
    }

    if (
      !employees.chairman ||
      !employees.secretary ||
      !employees.commission.length
    ) {
      toastError('Не указан(ы) председатель/секретарь/член комиссии');
      return;
    }

    // dispatch(startTakeDay(selectedTakeDay));
  }, [selectedTakeDay.id, degreeWorks, props.localTakeDay]);

  // const deleteTakeDayHandler = React.useCallback(() => {
  //   dispatch(deleteTakeDayAction(selectedTakeDay.id));
  // }, [dispatch, selectedTakeDay.id]);

  const disabled = !Boolean(selectedTakeDay.id);

  return (
    <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
      <EditorInputBlock>
        <Box sx={React.useMemo(() => ({ width: 'auto', margin: 'auto' }), [])}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Дата сдачи"
              value={props.localTakeDay.date}
              // onChange={(newDate) => {
              //   dispatch(
              //     updateTakeDayAction({ ...props.localTakeDay, date: newDate })
              //   );
              //   props.handlers.setDate(newDate);
              // }}
              renderInput={(params) => (
                <TextField
                  onKeyDown={(event) => event.preventDefault()}
                  {...params}
                />
              )}
              disabled={props.disabled}
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
          <AddTakeDayPopover />
          <DangerousButton
            /*onClick={deleteTakeDayHandler}*/ disabled={disabled}
          >
            Удалить
          </DangerousButton>
        </Box>
      </EditorInputBlock>
    </Box>
  );
};

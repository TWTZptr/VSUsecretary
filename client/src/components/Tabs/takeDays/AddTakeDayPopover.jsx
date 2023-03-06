import React from 'react';
import { Box } from '@mui/system';
import { CommonButton } from '../../common/CommonButton';
import { Popover, TextField } from '@mui/material';
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTakeDayAction } from '../../../redux/actions/takeDaysActions';
import { useDispatch } from 'react-redux';

export const AddTakeDayPopover = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popoverOpen = Boolean(anchorEl);

  const onOpen = (event) => {
    setAnchorEl(event.target);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (date) => {
    dispatch(createTakeDayAction({ date }));
    onClose();
  };

  const dispatch = useDispatch();

  return (
    <>
      <CommonButton onClick={onOpen}>Добавить</CommonButton>
      <Popover
        open={popoverOpen}
        id="addTakeDayPopover"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={onClose}
      >
        <Box sx={{ width: 'auto', margin: 'auto' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
              orientation="landscape"
              openTo="day"
              label="Дата"
              onChange={onSelect}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Popover>
    </>
  );
};

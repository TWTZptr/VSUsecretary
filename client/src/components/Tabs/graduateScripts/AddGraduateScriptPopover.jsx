import React from 'react';
import { Box } from '@mui/system';
import { CommonButton } from '../../common/CommonButton';
import { Popover, TextField } from '@mui/material';
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';

export const AddGraduateScriptPopover = React.memo(() => {
  const { createGraduateScript } = useGraduateScriptsStore((state) => state);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const popoverOpen = Boolean(anchorEl);

  const onOpen = (event) => {
    setAnchorEl(event.target);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (date) => {
    createGraduateScript({ date });
    onClose();
  };

  return (
    <>
      <CommonButton onClick={onOpen}>Добавить</CommonButton>
      <Popover
        open={popoverOpen}
        id="addTakeDayPopover"
        anchorEl={anchorEl}
        anchorOrigin={React.useMemo(
          () => ({ vertical: 'bottom', horizontal: 'left' }),
          []
        )}
        onClose={onClose}
      >
        <Box sx={React.useMemo(() => ({ width: 'auto', margin: 'auto' }), [])}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarPicker
              views={['day', 'month']}
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
});

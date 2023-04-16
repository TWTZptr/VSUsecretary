import React from 'react';
import { Box } from '@mui/system';
import { CommonButton } from '../../common/CommonButton';
import { Popover, TextField } from '@mui/material';
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useCommonStore } from '../../../hooks/zustand/commonStore';

export const AddGraduateScriptPopover = React.memo(() => {
  const { createGraduateScript } = useGraduateScriptsStore((state) => state);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const popoverOpen = Boolean(anchorEl);
  const { setCurrentYear } = useCommonStore((state) => state);

  const onOpen = React.useCallback((event) => {
    setAnchorEl(event.target);
  }, []);

  const onClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onSelect = React.useCallback(
    (date) => {
      createGraduateScript({ date });
      setCurrentYear(date.getFullYear());
      onClose();
    },
    [createGraduateScript, setCurrentYear, onClose]
  );

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

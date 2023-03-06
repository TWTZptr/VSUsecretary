import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const TakeDaySelector = React.memo((props) => {
  const label = props.label || 'День сдачи';
  return (
    <CommonFormControl sx={{ width: '100%' }} disabled={props.disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={props.onChange}
        value={props.takeDay.id || ''}
      >
        {props.takeDays.map((takeDay) => {
          return (
            <MenuItem value={takeDay.id} key={takeDay.id}>
              {takeDay.date}
            </MenuItem>
          );
        })}
      </Select>
    </CommonFormControl>
  );
});

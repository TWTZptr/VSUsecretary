import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const PlainSelector = React.memo((props) => {
  return (
    <CommonFormControl sx={props.sx} disabled={props.disabled}>
      <InputLabel>{props.name}</InputLabel>
      <Select
        label={props.name}
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
      >
        {props.values.map((value) => (
          <MenuItem value={value} key={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </CommonFormControl>
  );
});

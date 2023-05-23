import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const PlainSelector = React.memo(
  ({ sx, name, disabled, value, onChange, values }) => {
    const onSelfChange = React.useCallback(
      (event) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <CommonFormControl sx={sx} disabled={disabled}>
        <InputLabel>{name}</InputLabel>
        <Select label={name} onChange={onSelfChange} value={value}>
          {values.map((value) => (
            <MenuItem value={value} key={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </CommonFormControl>
    );
  }
);

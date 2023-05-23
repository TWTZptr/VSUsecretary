import React from 'react';
import { useMarksStore } from '../../../hooks/zustand/useMarksStore';
import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

export const MarkSelector = React.memo(
  ({ sx, label, disabled, onChange, value }) => {
    const localLabel = label || 'Оценка';
    const { marks } = useMarksStore((state) => state);

    const onSelfChange = React.useCallback(
      (event) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <CommonFormControl
        sx={React.useMemo(
          () => ({ width: '110px', textAlign: 'left', ...sx }),
          [sx]
        )}
        disabled={disabled}
      >
        <InputLabel>{localLabel}</InputLabel>
        <Select label={localLabel} onChange={onSelfChange} value={value}>
          {marks.map((mark) => (
            <MenuItem value={mark.id} key={mark.id}>
              {mark.mark}
            </MenuItem>
          ))}
        </Select>
      </CommonFormControl>
    );
  }
);

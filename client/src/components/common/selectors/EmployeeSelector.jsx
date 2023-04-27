import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const EmployeeSelector = React.memo(
  ({ label, sx, disabled, employee, employees, onChange }) => {
    const localLabel = label || 'Сотрудник';

    return (
      <CommonFormControl
        sx={React.useMemo(() => ({ flexGrow: 1, ...sx }), [sx])}
        disabled={disabled}
      >
        <InputLabel>{localLabel}</InputLabel>
        <Select
          label={localLabel}
          onChange={onChange}
          value={employee.id || ''}
        >
          {employees.map((employee) => {
            return (
              <MenuItem value={employee.id} key={employee.id}>
                {employee.lastname} {employee.name[0]}. {employee.patronymic[0]}
                .
              </MenuItem>
            );
          })}
        </Select>
      </CommonFormControl>
    );
  }
);

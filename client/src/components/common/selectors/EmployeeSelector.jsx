import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const EmployeeSelector = React.memo((props) => {
  const label = props.label || 'Сотрудник';
  return (
    <CommonFormControl
      sx={React.useMemo(() => ({ flexGrow: 1, ...props.sx }), [props.sx])}
      disabled={props.disabled}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={props.onChange}
        value={props.employee.id || ''}
      >
        {props.employees.map((employee) => {
          return (
            <MenuItem value={employee.id} key={employee.id}>
              {employee.lastname} {employee.name[0]}. {employee.patronymic[0]}.
            </MenuItem>
          );
        })}
      </Select>
    </CommonFormControl>
  );
});

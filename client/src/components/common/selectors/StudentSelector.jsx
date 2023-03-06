import { CommonFormControl } from '../CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const StudentSelector = React.memo((props) => {
  const label = props.label || 'Студент';
  return (
    <CommonFormControl sx={{ width: '100%' }} disabled={props.disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={props.onChange}
        value={props.student.id || ''}
      >
        {props.students.map((student) => {
          return (
            <MenuItem value={student.id} key={student.id}>
              {student.lastname} {student.name[0]}. {student.patronymic[0]}.
            </MenuItem>
          );
        })}
      </Select>
    </CommonFormControl>
  );
});

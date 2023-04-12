import React from 'react';
import { MenuItem } from '@mui/material';

export const EmployeesSearchDropdownAdd = React.memo(({ onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      <i>
        <b>Добавить</b>
      </i>
    </MenuItem>
  );
});

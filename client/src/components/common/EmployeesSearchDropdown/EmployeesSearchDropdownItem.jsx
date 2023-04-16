import React from 'react';
import { MenuItem } from '@mui/material';

export const EmployeesSearchDropdownItem = React.memo(
  ({ employee, onClick }) => {
    const onSelfClick = React.useCallback(() => {
      onClick(employee);
    }, [employee, onClick]);

    return (
      <MenuItem
        value={employee.id}
        onClick={onSelfClick}
        style={React.useMemo(() => ({ textOverflow: 'ellipsis' }), [])}
      >
        {employee.name} {employee.lastname} {employee.patronymic}
      </MenuItem>
    );
  }
);

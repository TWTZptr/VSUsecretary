import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

export const EmployeeListItem = ({ onClick, employee, selected }) => {
  const onSelfClick = React.useCallback(() => {
    onClick(employee);
  }, [onClick, employee]);

  return (
    <CommonListItem
      key={employee.id}
      disablePadding
      onClick={onSelfClick}
      active={selected}
    >
      <ListItemButton>
        <ListItemText
          primary={`${employee.lastname} ${employee.name} ${employee.patronymic}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

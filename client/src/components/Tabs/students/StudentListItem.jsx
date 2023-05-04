import { ListItemButton, ListItemText } from '@mui/material';
import CommonListItem from '../../common/CommonListItem';
import React from 'react';

export const StudentListItem = ({ student, onClick, selected }) => {
  const onSelfClick = React.useCallback(() => {
    onClick(student);
  }, [onClick, student]);

  return (
    <CommonListItem
      key={student.id}
      disablePadding
      onClick={onSelfClick}
      active={selected}
    >
      <ListItemButton>
        <ListItemText
          primary={`${student.lastname} ${student.name} ${student.patronymic}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

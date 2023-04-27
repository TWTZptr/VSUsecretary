import React from 'react';
import CommonListItem from '../../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';
import { formatPerson } from '../../../../helpers/formatters';

export const StudentsPopoverItem = React.memo(({ onClick, student }) => {
  const onSelfClick = React.useCallback(() => {
    onClick(student);
  }, [onClick, student]);

  return (
    <CommonListItem key={student.id} disablePadding onClick={onSelfClick}>
      <ListItemButton>
        <ListItemText primary={`${formatPerson(student)}`} />
      </ListItemButton>
    </CommonListItem>
  );
});

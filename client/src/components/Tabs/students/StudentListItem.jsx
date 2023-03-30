import { ListItemButton, ListItemText } from '@mui/material';
import CommonListItem from '../../common/CommonListItem';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';
import React from 'react';

export const StudentListItem = ({ student, onClick, selected }) => {
  const direction = useDirectionsStore((state) => state.directions).find(
    (d) => d.id === student.directionId
  );

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
          primary={`${student.lastname} ${student.name} ${student.patronymic} ${direction?.shortName}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

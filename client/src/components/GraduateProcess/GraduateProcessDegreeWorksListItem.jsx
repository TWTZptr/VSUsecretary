import React from 'react';
import CommonListItem from '../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';
import { formatPerson } from '../../helpers/formatters';

export const GraduateProcessDegreeWorksListItem = React.memo(
  ({ student, onClick, selected }) => {
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
            primary={`${formatPerson(student)} ${student.degreeWork.theme}`}
          />
        </ListItemButton>
      </CommonListItem>
    );
  }
);

import React from 'react';
import { GraduateProcessDegreeWorksListItem } from './GraduateProcessDegreeWorksListItem';
import { List } from '@mui/material';

const sx = {
  width: '25%',
  maxHeight: 500,
  backgroundColor: '#ededed',
  borderRadius: '2px',
  overflow: 'auto',
};

export const GraduateProcessStudentsList = React.memo(
  ({ students, onSelect, selectedStudent }) => {
    const onClick = React.useCallback(
      (student) => {
        onSelect(student);
      },
      [onSelect]
    );

    return (
      <List sx={sx}>
        {students.map((student) => (
          <GraduateProcessDegreeWorksListItem
            key={student.id}
            student={student}
            onClick={onClick}
            selected={student.id === selectedStudent.id}
          />
        ))}
      </List>
    );
  }
);

import { TableBody } from '@mui/material';
import React from 'react';
import { StudentsTableItem } from './StudentsTableItem';

export const StudentsListItems = React.memo(({ students, onDelete }) => {
  return (
    <TableBody>
      {students.map((student) => (
        <StudentsTableItem
          key={student.id}
          student={student}
          onDelete={onDelete}
        />
      ))}
    </TableBody>
  );
});
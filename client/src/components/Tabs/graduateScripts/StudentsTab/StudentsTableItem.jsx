import { formatPerson } from '../../../../helpers/formatters';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useEmployeesStore } from '../../../../hooks/zustand/useEmployeesStore';

export const StudentsTableItem = React.memo(({ student, onDelete }) => {
  const studentName = student ? formatPerson(student) : <i>Не указан</i>;
  const { employees } = useEmployeesStore((state) => state);

  const onSelfClick = React.useCallback(() => {
    onDelete(student);
  }, [student, onDelete]);

  const supervisor = employees.find(
    (employee) => employee.id === student.supervisorId
  );

  const supervisorName = supervisor ? (
    formatPerson(supervisor)
  ) : (
    <i>Не указан</i>
  );

  return (
    <TableRow
      key={student.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{student.degreeWork.theme}</TableCell>
      <TableCell>{studentName}</TableCell>
      <TableCell>{supervisorName}</TableCell>
      <TableCell>
        <IconButton edge="end" aria-label="delete" onClick={onSelfClick}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

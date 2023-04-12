import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { formatPerson } from '../../../../helpers/formatters';
import { useStudentsStore } from '../../../../hooks/zustand/useStudentsStore';
import { useEmployeesStore } from '../../../../hooks/zustand/useEmployeesStore';

export const DegreeWorkListItems = React.memo((props) => {
  const { students } = useStudentsStore((state) => state);
  const { employees } = useEmployeesStore((state) => state);

  return (
    <TableBody>
      {props.degreeWorks.map((degreeWork) => {
        const student = students.find(
          (student) => student.id === degreeWork.studentId
        );
        const studentName = student ? formatPerson(student) : <i>Не указан</i>;

        const supervisor = employees.find(
          (employee) => employee.id === degreeWork.supervisorId
        );
        const supervisorName = supervisor ? (
          formatPerson(supervisor)
        ) : (
          <i>Не указан</i>
        );

        return (
          <TableRow
            key={degreeWork.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{degreeWork.theme}</TableCell>
            <TableCell>{studentName}</TableCell>
            <TableCell>{supervisorName}</TableCell>
            <TableCell>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => props.handler(degreeWork)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
});

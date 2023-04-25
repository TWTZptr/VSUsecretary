import { formatPerson } from '../../../../helpers/formatters';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useEmployeesStore } from '../../../../hooks/zustand/useEmployeesStore';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/system';

const arrowsSx = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
};

export const StudentsTableItem = React.memo(({ student, onDelete }) => {
  const studentName = student ? formatPerson(student) : <i>Не указан</i>;
  const { employees } = useEmployeesStore((state) => state);

  const onSelfClick = React.useCallback(() => {
    onDelete(student);
  }, [student, onDelete]);

  const supervisor = employees.find(
    (employee) => employee.id === student.degreeWork.supervisorId
  );

  const supervisorName = supervisor ? (
    formatPerson(supervisor)
  ) : (
    <i>Не указан</i>
  );

  const onUp = React.useCallback(() => {
    // TODO
  }, []);

  const onDown = React.useCallback(() => {
    // TODO
  }, []);

  return (
    <TableRow
      key={student.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{student.degreeWork.theme}</TableCell>
      <TableCell>{studentName}</TableCell>
      <TableCell>{supervisorName}</TableCell>
      <TableCell>
        <Box
          sx={React.useMemo(
            () => ({
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }),
            []
          )}
        >
          <IconButton edge="end" aria-label="delete" onClick={onSelfClick}>
            <DeleteIcon onClick={onSelfClick} />
          </IconButton>
          <Box
            sx={React.useMemo(
              () => ({
                display: 'flex',
                flexDirection: 'column',
              }),
              []
            )}
          >
            <ArrowDropUpIcon fontSize="small" sx={arrowsSx} onClick={onUp} />
            <ArrowDropDownIcon
              fontSize="small"
              sx={arrowsSx}
              onClick={onDown}
            />
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
});

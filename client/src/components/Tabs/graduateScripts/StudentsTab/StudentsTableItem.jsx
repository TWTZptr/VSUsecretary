import { formatPerson } from '../../../../helpers/formatters';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useEmployeesStore } from '../../../../hooks/zustand/useEmployeesStore';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/system';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';

const arrowsSx = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
};

const iconButtonSx = {
  padding: 0,
};

export const StudentsTableItem = React.memo(
  ({ student, onDelete, disabled }) => {
    const studentName = student ? formatPerson(student) : <i>Не указан</i>;
    const { employees } = useEmployeesStore((state) => state);
    const { upStudent, downStudent } = useGraduateScriptsStore(
      (state) => state
    );

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

    const onUp = React.useCallback(async () => {
      await upStudent(student);
    }, [student, upStudent]);

    const onDown = React.useCallback(async () => {
      await downStudent(student);
    }, [student, downStudent]);

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
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={onSelfClick}
              disabled={disabled}
            >
              <DeleteIcon />
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
              <IconButton onClick={onUp} sx={iconButtonSx} disabled={disabled}>
                <ArrowDropUpIcon fontSize="small" sx={arrowsSx} />
              </IconButton>
              <IconButton
                onClick={onDown}
                sx={iconButtonSx}
                disabled={disabled}
              >
                <ArrowDropDownIcon fontSize="small" sx={arrowsSx} />
              </IconButton>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    );
  }
);

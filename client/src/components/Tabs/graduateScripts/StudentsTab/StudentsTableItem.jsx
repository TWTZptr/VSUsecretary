import { formatPerson } from '../../../../helpers/formatters';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useEmployeesStore } from '../../../../hooks/zustand/useEmployeesStore';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box } from '@mui/system';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';
import { generateProtocolAppendixDoc } from '../../../../services/docsService';
import { saveAs } from 'file-saver';
import SettingsIcon from '@mui/icons-material/Settings';

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
  ({ student, onDelete, disabled, onDegreeWorkEdit }) => {
    const studentName = student ? formatPerson(student) : <i>Не указан</i>;
    const { employees } = useEmployeesStore((state) => state);
    const { upStudent, downStudent, students } = useGraduateScriptsStore(
      (state) => state
    );

    const { selectedGraduateScript } = useGraduateScriptsStore(
      (state) => state
    );

    const onAppendixGenerate = React.useCallback(async () => {
      const res = await generateProtocolAppendixDoc(student.id);
      const studentIndex = students.findIndex(s => s.id === student.id)
      saveAs(
        res.data,
        `${studentIndex + 1} ${
          student.lastname
        } приложение к протоколу заседания ГЭК по защите ВКР.docx`
      );
    }, [student.id, student.lastname, students]);

    const onSelfClick = React.useCallback(() => {
      onDelete(student);
    }, [student, onDelete]);

    const supervisor = employees.find(
      (employee) => employee.id === student.degreeWork?.supervisorId
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

    const onDegreeWorkEditSelf = React.useCallback(() => {
      onDegreeWorkEdit(student);
    }, [student, onDegreeWorkEdit]);

    return (
      <TableRow
        key={student.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{student.degreeWork?.theme || <i>Не указана</i>}</TableCell>
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
              onClick={onDegreeWorkEditSelf}
              disabled={selectedGraduateScript.complete}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={onAppendixGenerate}
              disabled={!selectedGraduateScript.complete}
            >
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={onSelfClick}
              disabled={disabled}
            >
              <DeleteIcon fontSize="small" />
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

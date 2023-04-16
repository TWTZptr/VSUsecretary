import { Box } from '@mui/system';
import { Popover, Table, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { findUnusedItems } from '../../../../helpers/findUnusedItems';
import { StudentsListItems } from './StudentsTableItems';
import { CommonButton } from '../../../common/CommonButton';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';
import { StudentsPopover } from './StudentsPopover';
import { useStudentsStore } from '../../../../hooks/zustand/useStudentsStore';

export const StudentsTable = React.memo(() => {
  const { students, updateStudent } = useStudentsStore((state) => state);

  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const popoverOpen = Boolean(anchorEl);

  const onRemoveStudent = React.useCallback(
    (student) => {
      updateStudent({ ...student, graduateScriptId: null });
    },
    [updateStudent]
  );

  const usedStudents = selectedGraduateScript.id
    ? students.filter(
        (student) => student.graduateScriptId === selectedGraduateScript.id
      )
    : [];

  const unusedStudents = findUnusedItems(students, usedStudents);

  const popoverActivate = (event) => {
    setAnchorEl(event.target);
  };

  const anchorRef = React.useRef();

  const onClick = React.useCallback(
    (student) => {
      if (unusedStudents.length === 1) {
        setAnchorEl(null);
      }
      updateStudent({
        ...student,
        graduateScriptId: selectedGraduateScript.id,
      });
    },
    [selectedGraduateScript, unusedStudents.length]
  );

  const disabled = !Boolean(selectedGraduateScript.id);

  return (
    <Box
      sx={React.useMemo(
        () => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
          maxHeight: '400px',
          width: 'auto',
        }),
        []
      )}
    >
      <Table sx={React.useMemo(() => ({ flexGrow: '1' }), [])}>
        <TableHead>
          <TableRow>
            <TableCell sx={React.useMemo(() => ({ width: '250px' }), [])}>
              Тема
            </TableCell>
            <TableCell sx={React.useMemo(() => ({ width: '160px' }), [])}>
              Студент
            </TableCell>
            <TableCell sx={React.useMemo(() => ({ width: '160px' }), [])}>
              Научный руководитель
            </TableCell>
            <TableCell
              sx={React.useMemo(() => ({ width: '70px' }), [])}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <StudentsListItems students={usedStudents} onDelete={onRemoveStudent} />
      </Table>
      <CommonButton onClick={popoverActivate} disabled={disabled}>
        <AddIcon ref={anchorRef} />
      </CommonButton>
      <Popover
        open={popoverOpen}
        id="popover"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setAnchorEl(null)}
      >
        <StudentsPopover students={unusedStudents} onSelect={onClick} />
      </Popover>
    </Box>
  );
});

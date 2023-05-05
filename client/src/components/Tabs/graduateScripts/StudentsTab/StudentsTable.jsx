import { Box } from '@mui/system';
import { Popover, Table, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { StudentsListItems } from './StudentsTableItems';
import { CommonButton } from '../../../common/CommonButton';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';
import { StudentsPopover } from './StudentsPopover';
import { useStudentsStore } from '../../../../hooks/zustand/useStudentsStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllStudentsWithNoGraduateScript } from '../../../../services/studentsService';
import { useCommonStore } from '../../../../hooks/zustand/useCommonStore';

export const StudentsTable = React.memo(({ disabled }) => {
  const { updateStudent } = useStudentsStore((state) => state);

  const { selectedGraduateScript, students, getAllStudents } =
    useGraduateScriptsStore((state) => state);
  const { currentYear } = useCommonStore((state) => state);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const queryClient = useQueryClient();
  const popoverOpen = Boolean(anchorEl);

  const onRemoveStudent = React.useCallback(
    async (student) => {
      await updateStudent({ ...student, graduateScriptId: null });
      const promises = [
        queryClient.invalidateQueries([
          'studentsWithNoGraduateScript',
          currentYear,
        ]),
        getAllStudents(),
      ];

      await Promise.all(promises);
    },
    [updateStudent, currentYear, queryClient, getAllStudents]
  );

  const { data: unusedStudents } = useQuery({
    queryKey: ['studentsWithNoGraduateScript', currentYear],
    queryFn: () => getAllStudentsWithNoGraduateScript(currentYear),
    initialData: [],
  });

  const popoverActivate = React.useCallback((event) => {
      setAnchorEl(event.target);
  }, [setAnchorEl]);

  const anchorRef = React.useRef();

  const onPopoverClose = React.useCallback(
    () => setAnchorEl(null),
    [setAnchorEl]
  );

  const onClick = React.useCallback(
    async (student) => {
      if (unusedStudents.length === 1) {
        setAnchorEl(null);
      }

      await updateStudent({
        ...student,
        graduateScriptId: selectedGraduateScript.id,
        index: students.length + 1,
      });

      const promises = [
        getAllStudents(),
        queryClient.invalidateQueries([
          'studentsWithNoGraduateScript',
          currentYear,
        ]),
      ];

      await Promise.all(promises);
    },
    [
      selectedGraduateScript,
      unusedStudents.length,
      updateStudent,
      currentYear,
      queryClient,
      getAllStudents,
      students.length,
    ]
  );

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
            <TableCell sx={React.useMemo(() => ({ width: '40%' }), [])}>
              Тема
            </TableCell>
            <TableCell sx={React.useMemo(() => ({ width: '25%' }), [])}>
              Студент
            </TableCell>
            <TableCell sx={React.useMemo(() => ({ width: '25%' }), [])}>
              Научный руководитель
            </TableCell>
            <TableCell
              sx={React.useMemo(() => ({ width: '10%' }), [])}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <StudentsListItems
          students={students}
          onDelete={onRemoveStudent}
          disabled={disabled}
        />
      </Table>
      <CommonButton onClick={popoverActivate} disabled={disabled}>
        <AddIcon ref={anchorRef} />
      </CommonButton>
      <Popover
        open={popoverOpen}
        id="popover"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={onPopoverClose}
      >
        <StudentsPopover students={unusedStudents} onSelect={onClick} />
      </Popover>
    </Box>
  );
});

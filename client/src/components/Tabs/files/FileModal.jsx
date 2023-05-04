import React from 'react';
import { ModalBox } from '../../common/ModalBox';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { parseStudentsFromFile } from '../../../services/filesService';
import { toastError, toastSuccessful } from '../../../utils/toastSender';
import { useCommonStore } from '../../../hooks/zustand/useCommonStore';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';

export const FileModal = React.forwardRef(({ file }, ref) => {
  const { currentYear } = useCommonStore((state) => state);
  const { addStudents } = useStudentsStore((state) => state);

  const onParse = React.useCallback(async () => {
    const res = await parseStudentsFromFile(file.id, currentYear);
    if (!res.ok) {
      toastError(res.msg);
      return;
    }

    addStudents(res.data);
    toastSuccessful('Файл успешно распознан, студенты загружены');
  }, [file.id, currentYear, addStudents]);

  return (
    <ModalBox
      ref={ref}
      sx={React.useMemo(
        () => ({
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
        }),
        []
      )}
    >
      <Box>
        <Button
          variant="container"
          sx={React.useMemo(
            () => ({
              backgroundColor: '#e0e0e0',
              color: 'black',
              marginLeft: '2%',
              height: '100%',
              fontSize: '100%',
              width: 'auto',
            }),
            []
          )}
          onClick={onParse}
        >
          Загрузить студентов
        </Button>
      </Box>
    </ModalBox>
  );
});

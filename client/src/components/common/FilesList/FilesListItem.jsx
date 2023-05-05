import React from 'react';
import { Box } from '@mui/system';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import {
  downloadFile,
  parseStudentsFromFile,
} from '../../../services/filesService';
import { toastError, toastSuccessful } from '../../../utils/toastSender';
import { saveAs } from 'file-saver';
import CommentIcon from '@mui/icons-material/Comment';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';
import { useCommonStore } from '../../../hooks/zustand/useCommonStore';

const iconsSx = {
  marginLeft: '8px',
  '&:hover': {
    backgroundColor: 'white',
    borderRadius: '4px',
  },
};

export const FilesListItem = React.memo(({ file, onDelete }) => {
  const { addStudents } = useStudentsStore((state) => state);
  const { currentYear } = useCommonStore((state) => state);

  const onSelfDelete = React.useCallback(
    (e) => {
      e.stopPropagation();
      onDelete(file);
    },
    [onDelete, file]
  );

  const onDownload = React.useCallback(
    async (e) => {
      e.stopPropagation();
      const res = await downloadFile(file.id);

      if (!res.ok) {
        toastError('Ошибка при скачивании файла');
        return;
      }
      saveAs(res.data, file.name);
    },
    [file.id, file.name]
  );

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
    <Box
      sx={React.useMemo(
        () => ({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          cursor: 'pointer',
          width: '95%',
          '&:hover': {
            backgroundColor: '#bdbdbd9c',
            borderRadius: '5px',
          },
          padding: '4px',
          margin: '4px',
        }),
        []
      )}
    >
      <InsertDriveFileIcon />
      <Typography sx={React.useMemo(() => ({ lineHeight: '24px' }), [])}>
        {file.name}
      </Typography>
      <Box
        sx={React.useMemo(
          () => ({
            flexGrow: '1',
            textAlign: 'right',
          }),
          []
        )}
      >
        <CommentIcon sx={iconsSx} onClick={onParse} />
        <DownloadIcon sx={iconsSx} onClick={onDownload} />
        <CloseIcon
          sx={React.useMemo(
            () => ({
              marginLeft: '8px',
              '&:hover': {
                backgroundColor: 'white',
                borderRadius: '4px',
              },
            }),
            []
          )}
          onClick={onSelfDelete}
        />
      </Box>
    </Box>
  );
});

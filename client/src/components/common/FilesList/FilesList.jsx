import React from 'react';
import { Box } from '@mui/system';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteFile, getAllFilesByYear } from '../../../services/filesService';
import { useCommonStore } from '../../../hooks/zustand/useCommonStore';
import { sendFiles } from '../../../utils/sendFiles';
import { FilesListItem } from './FilesListItem';

export const FilesList = React.memo(({ parse }) => {
  const { currentYear } = useCommonStore((state) => state);
  const dropAreaRef = React.useRef(null);
  const [dragHover, setDragHover] = React.useState(0);
  const createMutation = useMutation(({ currentYear, files }) =>
    sendFiles(currentYear, files)
  );

  const deleteMutation = useMutation((file) => deleteFile(file.id));

  const queryClient = useQueryClient();

  const { data: files } = useQuery({
    queryKey: ['files', currentYear],
    queryFn: () => getAllFilesByYear(currentYear),
    initialData: [],
  });

  const onDragEnter = React.useCallback(() => {
    setDragHover((prev) => prev + 1);
  }, [setDragHover]);

  const onDragLeave = React.useCallback(() => {
    setDragHover((prev) => prev - 1);
  }, [setDragHover]);

  const onDrop = React.useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragHover(0);
      createMutation.mutate(
        { currentYear, files: e.dataTransfer.files },
        {
          onSuccess: () =>
            queryClient.invalidateQueries(['files', currentYear]),
        }
      );
    },
    [currentYear, createMutation, queryClient]
  );

  const onDragOver = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onFileUpload = React.useCallback(
    async (e) => {
      createMutation.mutate(
        { currentYear, files: e.dataTransfer.files },
        {
          onSuccess: () =>
            queryClient.invalidateQueries(['files', currentYear]),
        }
      );
    },
    [currentYear, createMutation, queryClient]
  );

  const onFileDelete = React.useCallback(
    (file) => {
      deleteMutation.mutate(file, {
        onSuccess: () => queryClient.invalidateQueries(['files', currentYear]),
      });
    },
    [currentYear, deleteMutation, queryClient]
  );

  return (
    <Box
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
      sx={React.useMemo(
        () => ({
          boxSizing: 'border-box',
          height: '90%',
          overflowY: 'auto',
          backgroundColor: dragHover ? '#bdbdbd9c' : '',
          border: 'dashed',
          borderColor: !dragHover ? 'white' : '',
          padding: '0 10%',
          textAlign: 'left',
          margin: '5px',
        }),
        [dragHover]
      )}
      ref={dropAreaRef}
    >
      <h4>
        Перетащите или{' '}
        <label htmlFor="file-upload">
          <input
            type="file"
            multiple={true}
            id="file-upload"
            style={React.useMemo(() => ({ display: 'none' }), [])}
            onChange={onFileUpload}
          />
          <span
            style={React.useMemo(
              () => ({
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '1rem',
                textDecoration: 'underline',
              }),
              []
            )}
          >
            Загрузите файл
          </span>
        </label>
      </h4>
      <h5>Загруженные файлы:</h5>
      <Box
        sx={React.useMemo(
          () => ({
            maxHeight: '85%',
            overflowY: 'auto',
          }),
          []
        )}
      >
        {files.map((file) => (
          <FilesListItem file={file} key={file.id} onDelete={onFileDelete} />
        ))}
      </Box>
    </Box>
  );
});

import React from 'react';
import { Box } from '@mui/system';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const FilesListItem = React.memo(({ file, onClick, onDelete }) => {
  const onSelfClick = React.useCallback(() => {
    onClick(file);
  }, [onClick, file]);

  const onSelfDelete = React.useCallback(() => {
    onDelete(file);
  }, [onDelete, file]);

  return (
    <Box
      onClick={onSelfClick}
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
      <InsertDriveFileIcon sx={React.useMemo(() => ({}), [])} />
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
        <CloseIcon
          sx={React.useMemo(
            () => ({
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

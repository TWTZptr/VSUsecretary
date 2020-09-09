import React from 'react';
import { FilesList } from '../components/common/FilesList/FilesList';
import { Box } from '@mui/system';

export const FilesPage = React.memo(({ parse }) => {
  return (
    <Box sx={React.useMemo(() => ({ height: '100%' }), [])}>
      <FilesList parse={parse} />
    </Box>
  );
});

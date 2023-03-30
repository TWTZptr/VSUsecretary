import { Box } from '@mui/system';
import { DirectionsList } from '../components/Tabs/directions/DirectionsList';
import React from 'react';
import { DirectionViewer } from '../components/Tabs/directions/DirectionViewer';
import { TabFlexbox } from '../components/common/TabFlexbox';

export const DirectionsPage = React.memo(() => {
  return (
    <TabFlexbox>
      <Box>
        <DirectionViewer />
      </Box>

      <Box sx={React.useMemo(() => ({ width: '50%', marginLeft: '40px' }), [])}>
        <DirectionsList />
      </Box>
    </TabFlexbox>
  );
});

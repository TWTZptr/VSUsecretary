import { Box } from '@mui/system';
import { DirectionsList } from '../Tabs/directions/DirectionsList';
import React from 'react';
import { DirectionViewer } from '../Tabs/directions/DirectionViewer';
import { TabFlexbox } from '../common/TabFlexbox';
import { useDirectionsStore } from '../../hooks/zustand/useDirectionsStore';

export const DirectionsPage = React.memo(() => {
  const { getAllDirections } = useDirectionsStore((state) => state);

  React.useEffect(() => {
    getAllDirections();
  }, [getAllDirections]);

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

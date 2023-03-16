import { Box } from '@mui/system';
import { DirectionsList } from './DirectionsList';
import React from 'react';
import { DirectionViewer } from './DirectionViewer';
import { TabFlexbox } from '../../common/TabFlexbox';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';

export const Directions = React.memo(() => {
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

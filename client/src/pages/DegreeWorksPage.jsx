import { TabFlexbox } from '../components/common/TabFlexbox';
import { Box } from '@mui/system';
import React from 'react';
import { DegreeWorkViewer } from '../components/Tabs/degreeWorks/DegreeWorkViewer';
import { DegreeWorksList } from '../components/Tabs/degreeWorks/DegreeWorksList';

export const DegreeWorksPage = React.memo(() => {
  return (
    <TabFlexbox>
      <Box>
        <DegreeWorkViewer />
      </Box>
      <Box sx={React.useMemo(() => ({ width: '50%', marginLeft: '40px' }), [])}>
        <DegreeWorksList />
      </Box>
    </TabFlexbox>
  );
});

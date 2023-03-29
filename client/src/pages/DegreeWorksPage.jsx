import { TabFlexbox } from '../components/common/TabFlexbox';
import { Box } from '@mui/system';
import React from 'react';
import { DegreeWorkViewer } from '../components/Tabs/degreeWorks/DegreeWorkViewer';
import { DegreeWorksList } from '../components/Tabs/degreeWorks/DegreeWorksList';
import { useDegreeWorksStore } from '../hooks/zustand/useDegreeWorksStore';

export const DegreeWorksPage = React.memo(() => {
  const { getAllDegreeWorks } = useDegreeWorksStore((state) => state);

  React.useEffect(() => {
    getAllDegreeWorks();
  }, [getAllDegreeWorks]);

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

import { Box } from '@mui/system';
import React from 'react';
import { TabFlexbox } from '../components/common/TabFlexbox';
import { StudentList } from '../components/Tabs/students/StudentList';
import { StudentViewer } from '../components/Tabs/students/StudentViewer';

export const StudentsPage = () => {
  return (
    <TabFlexbox>
      <Box>
        <StudentViewer />
      </Box>
      <Box sx={React.useMemo(() => ({ width: '50%', marginLeft: '70px' }), [])}>
        <StudentList />
      </Box>
    </TabFlexbox>
  );
};

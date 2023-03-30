import React from 'react';
import { TabFlexbox } from '../components/common/TabFlexbox';
import { Box } from '@mui/system';
import { EmployeeViewer } from '../components/Tabs/employees/EmployeeViewer';
import { EmployeeList } from '../components/Tabs/employees/EmployeeList';

export const EmployeesPage = React.memo(() => {
  return (
    <TabFlexbox>
      <Box>
        <EmployeeViewer />
      </Box>

      <Box sx={React.useMemo(() => ({ width: '50%', marginLeft: '70px' }), [])}>
        <EmployeeList />
      </Box>
    </TabFlexbox>
  );
});

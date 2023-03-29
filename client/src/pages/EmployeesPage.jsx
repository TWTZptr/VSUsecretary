import React from 'react';
import { TabFlexbox } from '../components/common/TabFlexbox';
import { Box } from '@mui/system';
import { EmployeeViewer } from '../components/Tabs/employees/EmployeeViewer';
import { EmployeeList } from '../components/Tabs/employees/EmployeeList';
import { useEmployeesStore } from '../hooks/zustand/useEmployeesStore';

export const EmployeesPage = React.memo(() => {
  const { getAllEmployees } = useEmployeesStore((state) => state);

  React.useEffect(() => {
    getAllEmployees();
  }, []);

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

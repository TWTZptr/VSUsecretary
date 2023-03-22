import React from 'react';
import { TabFlexbox } from '../common/TabFlexbox';
import { Box } from '@mui/system';
import { EmployeeViewer } from '../Tabs/employees/EmployeeViewer';
import { EmployeeList } from '../Tabs/employees/EmployeeList';
import { useEmployeesStore } from '../../hooks/zustand/useEmployeesStore';

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

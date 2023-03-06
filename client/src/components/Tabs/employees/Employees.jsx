import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllEmployeesAction } from '../../../redux/actions/employeesActions';
import { TabFlexbox } from '../../common/TabFlexbox';
import { Box } from '@mui/system';
import { EmployeeViewer } from './EmployeeViewer';
import { EmployeeList } from './EmployeeList';

export const Employees = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllEmployeesAction());
  }, []);

  return (
    props.index === props.value && (
      <TabFlexbox>
        <Box>
          <EmployeeViewer />
        </Box>

        <Box sx={{ width: '50%', marginLeft: '70px' }}>
          <EmployeeList />
        </Box>
      </TabFlexbox>
    )
  );
};

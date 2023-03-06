import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllStudentsAction } from '../../../redux/actions/studentsActions';
import { TabFlexbox } from '../../common/TabFlexbox';
import { StudentList } from './StudentList';
import { StudentViewer } from './StudentViewer';

export const Students = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllStudentsAction());
  }, []);

  return (
    props.index === props.value && (
      <TabFlexbox>
        <Box>
          <StudentViewer />
        </Box>
        <Box sx={{ width: '50%', marginLeft: '70px' }}>
          <StudentList />
        </Box>
      </TabFlexbox>
    )
  );
};

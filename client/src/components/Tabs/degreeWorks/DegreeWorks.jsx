import { TabFlexbox } from '../../common/TabFlexbox';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { getAllDegreeWorksAction } from '../../../redux/actions/degreeWorksActions';
import React from 'react';
import { DegreeWorkViewer } from './DegreeWorkViewer';
import { DegreeWorksList } from './DegreeWorksList';

export const DegreeWorks = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllDegreeWorksAction());
  }, [dispatch]);

  return (
    props.index === props.value && (
      <TabFlexbox>
        <Box>
          <DegreeWorkViewer />
        </Box>
        <Box sx={{ width: '50%', marginLeft: '40px' }}>
          <DegreeWorksList />
        </Box>
      </TabFlexbox>
    )
  );
};

import { Box } from '@mui/system';
import { DirectionList } from './DirectionList';
import React from 'react';
import { getAllDirectionsAction } from '../../../redux/actions/directionsActions';
import { DirectionViewer } from './DirectionViewer';
import { useDispatch } from 'react-redux';
import { TabFlexbox } from '../../common/TabFlexbox';

export const Directions = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllDirectionsAction());
  }, []);

  return (
    props.index === props.value && (
      <TabFlexbox>
        <Box>
          <DirectionViewer />
        </Box>

        <Box sx={{ width: '50%', marginLeft: '40px' }}>
          <DirectionList />
        </Box>
      </TabFlexbox>
    )
  );
};

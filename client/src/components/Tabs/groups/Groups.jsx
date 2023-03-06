import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllGroupsAction } from '../../../redux/actions/groupsActions';
import { TabFlexbox } from '../../common/TabFlexbox';
import { GroupList } from './GroupList';
import { GroupViewer } from './GroupViewer';

export const Groups = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllGroupsAction());
  }, []);

  const groupListBoxSx = React.useMemo(
    () => ({ width: '50%', marginLeft: '70px' }),
    []
  );

  return (
    props.index === props.value && (
      <TabFlexbox>
        <Box>
          <GroupViewer />
        </Box>

        <Box sx={groupListBoxSx}>
          <GroupList />
        </Box>
      </TabFlexbox>
    )
  );
};

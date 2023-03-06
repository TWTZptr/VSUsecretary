import { DefaultList } from '../../common/DefaultList';
import { GroupListItem } from './GroupListItem';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroup } from '../../../redux/slices/uiSlice';

export const GroupList = (props) => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.ui.selectedGroup);

  const groups = useSelector((state) => state.groups);

  return (
    <DefaultList>
      {groups.map((group) => {
        return (
          <GroupListItem
            group={group}
            key={group.id}
            selected={group.id === selectedGroup.id}
            onClick={() => dispatch(selectGroup(group))}
          />
        );
      })}
    </DefaultList>
  );
};

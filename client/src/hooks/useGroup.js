import { INITIAL_GROUP_STATE } from '../constants';
import React from 'react';

export const useGroup = (initialState = INITIAL_GROUP_STATE) => {
  const [group, setGroup] = React.useState(initialState);

  const groupHandlers = {
    setNumber: (number) => {
      setGroup({ ...group, number });
    },
    setDirectionId: (directionId) => {
      setGroup({ ...group, directionId });
    },
    setEducationLevel: (educationLevel) => {
      setGroup({ ...group, educationLevel });
    },
    setGroup: (group) => {
      setGroup(group);
    },
  };

  return [group, groupHandlers];
};

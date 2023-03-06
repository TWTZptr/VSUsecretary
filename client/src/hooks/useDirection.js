import { INITIAL_DIRECTION_STATE } from '../constants';
import React from 'react';

export const useDirection = (initialState = INITIAL_DIRECTION_STATE) => {
  const [direction, setDirection] = React.useState(initialState);

  const groupHandlers = {
    setCode: (code) => {
      setDirection({...direction, code});
    },
    setShortName: (shortName) => {
      setDirection({...direction, shortName});
    },
    setFullName: (fullName) => {
      setDirection({...direction, fullName});
    },
    setDirection: (direction) => {
      setDirection(direction);
    },
  };

  return [direction, groupHandlers];
};

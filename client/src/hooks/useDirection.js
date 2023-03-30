import { INITIAL_DIRECTION_STATE } from '../constants';
import React from 'react';

export const useDirection = (initialState = INITIAL_DIRECTION_STATE) => {
  const [direction, setDirection] = React.useState(initialState);

  const groupHandlers = React.useMemo(
    () => ({
      setCode: (code) => {
        setDirection((prevState) => ({ ...prevState, code }));
      },
      setShortName: (shortName) => {
        setDirection((prevState) => ({ ...prevState, shortName }));
      },
      setFullName: (fullName) => {
        setDirection((prevState) => ({ ...prevState, fullName }));
      },
      setDirection: (direction) => {
        setDirection(direction);
      },
      setEducationLevel: (educationLevelId) => {
        setDirection((prevState) => ({ ...prevState, educationLevelId }));
      },
    }),
    []
  );

  return [direction, groupHandlers];
};

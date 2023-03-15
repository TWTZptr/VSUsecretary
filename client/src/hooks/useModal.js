import React from 'react';

export const useModal = (initialValue = false) => {
  const [active, setActive] = React.useState(initialValue);
  const activate = React.useCallback(() => setActive(true), []);

  const inactivate = React.useCallback(() => setActive(false), []);

  return [active, activate, inactivate];
};

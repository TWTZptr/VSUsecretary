import { Directions } from './Directions';
import React from 'react';

export const DirectionsPage = React.memo((props) => {
  return props.index === props.value && <Directions />;
});

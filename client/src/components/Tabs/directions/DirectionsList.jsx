import React from 'react';
import { DefaultList } from '../../common/DefaultList';
import { DirectionListItem } from './DirectionListItem';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';

export const DirectionsList = React.memo(() => {
  const { directions, selectedDirection, selectDirection } = useDirectionsStore(
    (state) => state
  );

  const onClick = React.useCallback(
    (direction) => {
      selectDirection(direction);
    },
    [selectDirection]
  );

  return (
    <DefaultList>
      {directions.map((direction) => (
        <DirectionListItem
          direction={direction}
          key={direction.id}
          selected={direction.id === selectedDirection.id}
          onClick={onClick}
        />
      ))}
    </DefaultList>
  );
});

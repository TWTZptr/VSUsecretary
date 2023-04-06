import React from 'react';
import { DirectionListItem } from './DirectionListItem';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';
import { FilteredList } from '../../common/FilteredList';

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

  const transform = React.useCallback(
    (direction) => (
      <DirectionListItem
        direction={direction}
        key={direction.id}
        selected={direction.id === selectedDirection.id}
        onClick={onClick}
      />
    ),
    [onClick, selectedDirection.id]
  );

  return (
    <FilteredList
      filterBy={React.useMemo(() => ['shortName', 'fullName', 'code'], [])}
      items={directions}
      transform={transform}
    />
  );
});

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDirection } from '../../../redux/slices/uiSlice';
import { DefaultList } from '../../common/DefaultList';
import { DirectionListItem } from './DirectionListItem';

export const DirectionList = (props) => {
  const dispatch = useDispatch();
  const selectedDirection = useSelector((state) => state.ui.selectedDirection);

  const directions = useSelector((state) => state.directions);

  return (
    <DefaultList>
      {directions.map((direction) => {
        return (
          <DirectionListItem
            direction={direction}
            key={direction.id}
            selected={direction.id === selectedDirection.id}
            onClick={() => dispatch(selectDirection(direction))}
          />
        );
      })}
    </DefaultList>
  );
};

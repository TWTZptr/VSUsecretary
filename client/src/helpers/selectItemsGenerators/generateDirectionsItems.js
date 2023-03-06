import { MenuItem } from '@mui/material';
import CommonListItem from '../../components/common/CommonListItem';
import React from 'react';

export const generateDirectionsItems = (directions) => {
  let directionsList;
  if (directions.length) {
    directionsList = directions.map((direction) => {
      return (
        <MenuItem value={direction.id} key={direction.id}>
          {direction.code} {direction.shortName}
        </MenuItem>
      );
    });
  } else {
    directionsList = (
      <CommonListItem>
        <i>Пусто</i>
      </CommonListItem>
    );
  }
  return directionsList;
};

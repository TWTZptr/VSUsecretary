import { MenuItem } from '@mui/material';
import React from 'react';
import CommonListItem from '../../components/common/CommonListItem';

export const generateTakeDaysItems = (takeDays) => {
  let takeDaysList;
  if (takeDays.length) {
    takeDaysList = takeDays.map((takeDay) => {
      return (
        <MenuItem value={takeDay.id} key={takeDay.id}>
          {takeDay.date}
        </MenuItem>
      );
    });
  } else {
    takeDaysList = (
      <CommonListItem>
        <i>Пусто</i>
      </CommonListItem>
    );
  }
  return takeDaysList;
};

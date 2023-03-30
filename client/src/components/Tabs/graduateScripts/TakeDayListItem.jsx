import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

export const TakeDayListItem = ({ graduateScript, onClick, selected }) => {
  const onSelfClick = React.useCallback(() => {
    onClick(graduateScript);
  }, [onClick, graduateScript]);

  return (
    <CommonListItem
      key={graduateScript.id}
      disablePadding
      onClick={onSelfClick}
      active={selected}
    >
      <ListItemButton>
        <ListItemText primary={`${graduateScript.date}`} />
      </ListItemButton>
    </CommonListItem>
  );
};

import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

export const DirectionListItem = React.memo(
  ({ direction, onClick, selected }) => {
    const onSelfClick = React.useCallback(() => {
      onClick(direction);
    }, [onClick, direction]);

    return (
      <CommonListItem
        key={direction.id}
        disablePadding
        onClick={onSelfClick}
        active={selected}
      >
        <ListItemButton>
          <ListItemText primary={`${direction.code} ${direction.shortName}`} />
        </ListItemButton>
      </CommonListItem>
    );
  }
);

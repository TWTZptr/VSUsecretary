import { ListItemButton, ListItemText } from '@mui/material';
import CommonListItem from '../../common/CommonListItem';
import React from 'react';

export const DegreeWorksListItem = React.memo((props) => {
  const onClick = React.useCallback(() => {
    props.onClick(props.degreeWork);
  }, [props.onClick, props.degreeWork]);

  return (
    <CommonListItem
      key={props.degreeWork.id}
      disablePadding
      active={props.selected}
      onClick={onClick}
    >
      <ListItemButton sx={props.sx}>
        <ListItemText primary={props.name || `${props.degreeWork.theme}`} />
      </ListItemButton>
    </CommonListItem>
  );
});

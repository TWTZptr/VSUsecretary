import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';

export const DirectionListItem = (props) => {
  return (
    <CommonListItem
      key={props.direction.id}
      disablePadding
      onClick={props.onClick}
      active={props.selected}
    >
      <ListItemButton>
        <ListItemText
          primary={`${props.direction.code} ${props.direction.shortName}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

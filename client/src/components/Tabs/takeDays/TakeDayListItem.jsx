import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';

export const TakeDayListItem = (props) => {
  return (
    <CommonListItem
      key={props.takeDay.id}
      disablePadding
      onClick={props.onClick}
      active={props.selected}
    >
      <ListItemButton>
        <ListItemText primary={`${props.takeDay.date}`} />
      </ListItemButton>
    </CommonListItem>
  );
};

import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';

export const GroupListItem = (props) => {
  return (
    <CommonListItem
      key={props.group.id}
      disablePadding
      onClick={props.onClick}
      active={props.selected}
    >
      <ListItemButton>
        <ListItemText
          primary={`${props.group.number} гр ${props.group.educationLevel}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

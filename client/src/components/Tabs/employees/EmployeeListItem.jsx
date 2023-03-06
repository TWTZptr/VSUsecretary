import CommonListItem from '../../common/CommonListItem';
import { ListItemButton, ListItemText } from '@mui/material';

export const EmployeeListItem = (props) => {
  return (
    <CommonListItem
      key={props.employee.id}
      disablePadding
      onClick={props.onClick}
      active={props.selected}
    >
      <ListItemButton>
        <ListItemText
          primary={`${props.employee.lastname} ${props.employee.name} ${props.employee.patronymic}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

import { ListItemButton, ListItemText } from '@mui/material';
import CommonListItem from '../../common/CommonListItem';
import { useSelector } from 'react-redux';

export const StudentListItem = (props) => {
  const group = useSelector((state) => state.groups).find(
    (group) => props.student.groupId === group.id
  );

  const groupName = group ? `${group.number} гр` : '';

  return (
    <CommonListItem
      key={props.student.id}
      disablePadding
      onClick={props.onClick}
      active={props.selected}
    >
      <ListItemButton>
        <ListItemText
          primary={`${props.student.lastname} ${props.student.name} ${props.student.patronymic} ${groupName}`}
        />
      </ListItemButton>
    </CommonListItem>
  );
};

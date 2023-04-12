import React from 'react';
import { Box, List, ListItem, ListItemButton, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { removeEmployeeGraduateScript } from '../../../../services/graduateScriptsService';
import { DefaultList } from '../../../common/DefaultList';
import { EmployeeListItem } from '../../employees/EmployeeListItem';
import { findUnusedItems } from '../../../../helpers/findUnusedItems';
import CommonListItem from '../../../common/CommonListItem';
import { CommissionListItems } from './CommissionListItems';

export const CommissionList = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDeleteEmployee = (employeeToDelete) => {
    removeEmployeeGraduateScript(props.takeDayId, employeeToDelete.id).then(
      (res) => {
        props.setCommission(
          props.currentCommission.filter(
            (employee) => employee.id !== employeeToDelete.id
          )
        );
      }
    );
  };

  const popoverActivate = (event) => {
    setAnchorEl(event.target);
  };

  const unusedCommissionMembers = findUnusedItems(
    props.commissionMembers,
    props.currentCommission
  );

  const popoverOpen = Boolean(anchorEl);

  const anchorRef = React.useRef();

  let unusedMembersListItems;
  if (unusedCommissionMembers.length) {
    unusedMembersListItems = unusedCommissionMembers.map((member) => {
      return (
        <EmployeeListItem
          employee={member}
          key={member.id}
          onClick={() => {
            props.handleAdd(member);
          }}
        />
      );
    });
  } else {
    unusedMembersListItems = (
      <CommonListItem>
        <i>Пусто</i>
      </CommonListItem>
    );
  }

  return (
    <List sx={{ maxHeight: '150px', overflowY: 'visible' }}>
      <ListItem>Члены комиссии ГЭК:</ListItem>
      <CommissionListItems
        commission={props.currentCommission}
        onDelete={handleDeleteEmployee}
      />
      <ListItem>
        <ListItemButton
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          onClick={popoverActivate}
          disabled={props.disabled}
        >
          <AddIcon ref={anchorRef} />
        </ListItemButton>
        <Popover
          open={popoverOpen}
          id="popover"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          onClose={() => setAnchorEl(null)}
        >
          <Box>
            <DefaultList>{unusedMembersListItems}</DefaultList>
          </Box>
        </Popover>
      </ListItem>
    </List>
  );
};

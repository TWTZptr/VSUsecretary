import { IconButton, ListItem, ListItemText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';

export const CommissionListItems = (props) => {
  return (
    <>
      {props.commission.map((employee) => {
        return (
          <ListItem
            key={employee.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => props.onDelete(employee)}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${employee.lastname} ${employee.name[0]}. ${employee.patronymic[0]}.`}
            />
          </ListItem>
        );
      })}
    </>
  );
};

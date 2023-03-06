import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React from 'react';

export const ImplementationSwitch = React.memo((props) => {
  return (
    <FormGroup sx={{ marginLeft: '20px' }}>
      <FormControlLabel
        control={<Switch onChange={props.onChange} checked={props.checked} />}
        label={props.label}
        disabled={props.disabled}
      />
    </FormGroup>
  );
});

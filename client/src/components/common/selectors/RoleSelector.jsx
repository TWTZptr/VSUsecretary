import { PlainSelector } from './PlainSelector';
import React from 'react';

export const RoleSelector = React.memo((props) => {
  const label = props.label || 'Роль';
  return (
    <PlainSelector
      name={label}
      label={label}
      values={props.values}
      onChange={props.onChange}
      disabled={props.disabled}
      sx={React.useMemo(
        () => ({
          width: '200px',
          textAlign: 'left',
          ...props.sx,
        }),
        [props.sx]
      )}
      value={props.value}
    />
  );
});

import { AVAILABLE_WORK_MARKS } from '../../../constants';
import { PlainSelector } from './PlainSelector';
import React from 'react';

export const MarkSelector = React.memo((props) => {
  const label = props.label || 'Оценка';
  return (
    <PlainSelector
      name={label}
      label={label}
      values={AVAILABLE_WORK_MARKS}
      onChange={props.onChange}
      disabled={props.disabled}
      sx={{ width: '110px', textAlign: 'left', ...props.sx }}
      value={props.value}
    />
  );
});

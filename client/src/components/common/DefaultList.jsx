import { CommonList } from './CommonList';
import React from 'react';

export const DefaultList = React.memo((props) => {
  return (
    <CommonList
      sx={React.useMemo(
        () => ({
          maxWidth: '400px',
          borderRadius: '2px',
          borderWidth: 0,
          height: 'auto',
          maxHeight: '600px',
          overflowY: 'auto',
          ...props.sx,
        }),
        [props.sx]
      )}
    >
      {props.children}
    </CommonList>
  );
});

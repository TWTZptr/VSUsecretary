import { CommonTextField } from '../../common/CommonTextField';
import { Box } from '@mui/system';
import React from 'react';
import { EditorInputBlock } from '../../common/EditorInputBlock';

export const DirectionEditor = (props) => {
  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Код"
          id="code"
          onChange={(event) => props.handlers.setCode(event.target.value)}
          value={props.localDirection.code}
          disabled={props.disabled}
        />
        <CommonTextField
          label="Короткое название"
          id="short-name"
          onChange={(event) => props.handlers.setShortName(event.target.value)}
          value={props.localDirection.shortName}
          disabled={props.disabled}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <CommonTextField
          label="Полное название"
          id="full-name"
          sx={React.useMemo(() => ({ width: '100%' }), [])}
          onChange={(event) => props.handlers.setFullName(event.target.value)}
          value={props.localDirection.fullName}
          disabled={props.disabled}
        />
      </EditorInputBlock>
    </Box>
  );
};

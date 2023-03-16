import { CommonTextField } from '../../common/CommonTextField';
import { Box } from '@mui/system';
import React from 'react';
import { EditorInputBlock } from '../../common/EditorInputBlock';

export const DirectionEditor = React.memo(
  ({
    handlers: { setCode, setShortName, setFullName },
    localDirection,
    disabled,
  }) => {
    const handleCodeChange = React.useCallback(
      (event) => {
        setCode(event.target.value);
      },
      [setCode]
    );

    const handleShortNameChange = React.useCallback(
      (event) => {
        setShortName(event.target.value);
      },
      [setShortName]
    );

    const handleFullNameChange = React.useCallback(
      (event) => {
        setFullName(event.target.value);
      },
      [setFullName]
    );

    return (
      <Box>
        <EditorInputBlock>
          <CommonTextField
            label="Код"
            id="code"
            onChange={handleCodeChange}
            value={localDirection.code}
            disabled={disabled}
          />
          <CommonTextField
            label="Короткое название"
            id="short-name"
            onChange={handleShortNameChange}
            value={localDirection.shortName}
            disabled={disabled}
          />
        </EditorInputBlock>
        <EditorInputBlock>
          <CommonTextField
            label="Полное название"
            id="full-name"
            sx={React.useMemo(() => ({ width: '100%' }), [])}
            onChange={handleFullNameChange}
            value={localDirection.fullName}
            disabled={disabled}
          />
        </EditorInputBlock>
      </Box>
    );
  }
);

import { CommonTextField } from '../../common/CommonTextField';
import { Box } from '@mui/system';
import React from 'react';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { CommonFormControl } from '../../common/CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useCommonStore } from '../../../hooks/zustand/useCommonStore';

export const DirectionEditor = React.memo(
  ({
    handlers: { setCode, setShortName, setFullName, setEducationLevel },
    localDirection,
    disabled,
  }) => {
    const { educationLevels } = useCommonStore((state) => state);

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

    const handleEducationLevelChange = React.useCallback(
      (event) => {
        setEducationLevel(event.target.value);
      },
      [setEducationLevel]
    );

    const educationsLevelsList = React.useMemo(
      () =>
        educationLevels.map((lvl) => (
          <MenuItem value={lvl.id} key={lvl.id}>
            {lvl.name}
          </MenuItem>
        )),
      [educationLevels]
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
        <EditorInputBlock>
          <CommonFormControl
            sx={React.useMemo(() => ({ width: '100%' }), [])}
            disabled={disabled}
          >
            <InputLabel>Академическая степень</InputLabel>
            <Select
              label="Академическая степень"
              onChange={handleEducationLevelChange}
              value={localDirection.educationLevelId || ''}
            >
              {educationsLevelsList}
            </Select>
          </CommonFormControl>
        </EditorInputBlock>
      </Box>
    );
  }
);

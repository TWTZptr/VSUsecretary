import { Box } from '@mui/system';
import React from 'react';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { CommonTextField } from '../../common/CommonTextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { CommonFormControl } from '../../common/CommonFormControl';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';

export const StudentEditor = ({ handlers, disabled, localStudent }) => {
  const { directions } = useDirectionsStore((state) => state);

  const onLastnameChange = React.useCallback(
    (event) => {
      handlers.setLastname(event.target.value);
    },
    [handlers]
  );

  const onNameChange = React.useCallback(
    (event) => {
      handlers.setName(event.target.value);
    },
    [handlers]
  );

  const onPatronymicChange = React.useCallback(
    (event) => handlers.setPatronymic(event.target.value),
    [handlers]
  );

  const onPublicationsChange = React.useCallback(
    (event) => handlers.setPublications(event.target.value),
    [handlers]
  );

  const onDirectionChange = React.useCallback(
    (event) => handlers.setDirectionId(event.target.value),
    [handlers]
  );

  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Фамилия"
          id="lastname"
          onChange={onLastnameChange}
          value={localStudent.lastname}
          disabled={disabled}
        />
        <CommonTextField
          label="Имя"
          id="name"
          onChange={onNameChange}
          value={localStudent.name}
          disabled={disabled}
        />
        <CommonTextField
          label="Отчество"
          id="patronymic"
          onChange={onPatronymicChange}
          value={localStudent.patronymic}
          disabled={disabled}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <CommonTextField
          label="Публикации"
          id="publications"
          sx={React.useMemo(() => ({ width: '100%' }), [])}
          onChange={onPublicationsChange}
          value={localStudent.publications || ''}
          disabled={disabled}
        />
        <CommonFormControl
          sx={React.useMemo(() => ({ width: '100%' }), [])}
          disabled={disabled}
        >
          <InputLabel>Направление</InputLabel>
          <Select
            label="Направление"
            onChange={onDirectionChange}
            value={localStudent.directionId || ''}
          >
            {directions.map((direction) => (
              <MenuItem value={direction.id} key={direction.id}>
                {direction.code} {direction.shortName}
              </MenuItem>
            ))}
          </Select>
        </CommonFormControl>
      </EditorInputBlock>
    </Box>
  );
};

import { Box } from '@mui/system';
import React from 'react';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { CommonTextField } from '../../common/CommonTextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { CommonFormControl } from '../../common/CommonFormControl';
import { useSelector } from 'react-redux';

export const StudentEditor = (props) => {
  const groups = useSelector((state) => state.groups);

  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Фамилия"
          id="lastname"
          onChange={(event) => props.handlers.setLastname(event.target.value)}
          value={props.localStudent.lastname}
          disabled={props.disabled}
        />
        <CommonTextField
          label="Имя"
          id="name"
          onChange={(event) => props.handlers.setName(event.target.value)}
          value={props.localStudent.name}
          disabled={props.disabled}
        />
        <CommonTextField
          label="Отчество"
          id="patronymic"
          onChange={(event) => props.handlers.setPatronymic(event.target.value)}
          value={props.localStudent.patronymic}
          disabled={props.disabled}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <CommonTextField
          label="Публикации"
          id="publications"
          sx={{ width: '100%' }}
          onChange={(event) =>
            props.handlers.setPublications(event.target.value)
          }
          value={props.localStudent.publications}
          disabled={props.disabled}
        />
        <CommonFormControl sx={{ width: '100%' }} disabled={props.disabled}>
          <InputLabel>Группа</InputLabel>
          <Select
            label="Группа"
            onChange={(event) => props.handlers.setGroupId(event.target.value)}
            value={props.localStudent.groupId || ''}
          >
            {groups.map((group) => (
              <MenuItem value={group.id} key={group.id}>
                {group.number} {group.educationLevel}
              </MenuItem>
            ))}
          </Select>
        </CommonFormControl>
      </EditorInputBlock>
    </Box>
  );
};

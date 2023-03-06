import { Box } from '@mui/system';
import { CommonFormControl } from '../../common/CommonFormControl';
import { CommonTextField } from '../../common/CommonTextField';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { AVAILABLE_EDUCATION_LEVELS } from '../../../constants';
import { EditorInputBlock } from '../../common/EditorInputBlock';
import { StudentsListGenerationButton } from '../takeDays/GraduationMode/GraduationEnd/StudentsListGenerationButton';
import React from 'react';

export const GroupEditor = (props) => {
  const directions = useSelector((state) => state.directions);

  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Номер"
          id="number"
          onChange={(event) => props.handlers.setNumber(event.target.value)}
          value={props.localGroup.number}
          disabled={props.disabled}
        />
        <CommonFormControl sx={{ width: 200 }} disabled={props.disabled}>
          <InputLabel>Уровень</InputLabel>
          <Select
            defaultValue={AVAILABLE_EDUCATION_LEVELS[0]}
            label="Уровень"
            onChange={(event) =>
              props.handlers.setEducationLevel(event.target.value)
            }
          >
            {AVAILABLE_EDUCATION_LEVELS.map((level) => (
              <MenuItem value={level} key={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </CommonFormControl>
      </EditorInputBlock>
      <EditorInputBlock>
        <CommonFormControl sx={{ width: '100%' }} disabled={props.disabled}>
          <InputLabel>Направление</InputLabel>
          <Select
            label="Направление"
            onChange={(event) =>
              props.handlers.setDirectionId(event.target.value)
            }
            value={props.localGroup.directionId || ''}
          >
            {directions.map((direction) => {
              return (
                <MenuItem value={direction.id} key={direction.id}>
                  {direction.code} {direction.shortName}
                </MenuItem>
              );
            })}
          </Select>
        </CommonFormControl>
      </EditorInputBlock>
    </Box>
  );
};

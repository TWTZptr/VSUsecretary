import React from 'react';
import { EditorInputBlock } from '../../../common/EditorInputBlock';
import { Box } from '@mui/system';
import { PlainSelector } from '../../../common/selectors/PlainSelector';
import {
  AVAILABLE_ACADEMIC_DEGREES,
  AVAILABLE_ACADEMIC_RANKS,
} from '../../../../constants';
import { CommonTextField } from '../../../common/CommonTextField';

const fullWidthSx = { width: '100%' };

export const ExtraInfoEditor = React.memo(({ handlers, localExtraInfo }) => {
  const onPositionChange = React.useCallback(
    (e) => handlers.setPosition(e.target.value),
    [handlers]
  );

  const onAnotherJobChange = React.useCallback(
    (e) => handlers.setAnotherJob(e.target.value),
    [handlers]
  );

  return (
    <Box>
      <EditorInputBlock>
        <CommonTextField
          label="Должность"
          id="position"
          sx={React.useMemo(() => ({ width: '60%' }), [])}
          onChange={onPositionChange}
          value={localExtraInfo.position}
        />
        <CommonTextField
          label="Место работы"
          id="anotherJob"
          sx={fullWidthSx}
          onChange={onAnotherJobChange}
          value={localExtraInfo.anotherJob}
        />
      </EditorInputBlock>
      <EditorInputBlock>
        <PlainSelector
          name="Ученое звание"
          values={AVAILABLE_ACADEMIC_RANKS}
          onChange={handlers.setAcademicRank}
          value={localExtraInfo.academicRank}
          sx={fullWidthSx}
        />
        <PlainSelector
          name="Ученая степень"
          values={AVAILABLE_ACADEMIC_DEGREES}
          onChange={handlers.setAcademicDegree}
          value={localExtraInfo.academicDegree}
          sx={fullWidthSx}
        />
      </EditorInputBlock>
    </Box>
  );
});

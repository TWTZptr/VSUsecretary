import React from 'react';
import { CommonButton } from '../../../../common/CommonButton';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { generateMarksListShort } from '../../../../../helpers/docx/generateMarksListShort';
import { saveAs } from 'file-saver';

export const MarksShortListGenerationButton = React.memo((props) => {
  const takeDay = useSelector((state) => state.ui.startedTakeDay);

  const { employees, direction, group, students } = useSelector(
    (state) => state.graduation
  );

  const { chairman, secretary } = employees;

  const onClick = React.useCallback(async () => {
    const marksListOptions = {
      graduations: props.graduationsInfo,
      takeDay,
      chairman,
      secretary,
      direction,
      group,
      students,
      degreeWorks: props.degreeWorks,
    };

    const doc = await generateMarksListShort(marksListOptions);
    saveAs(doc, `${takeDay.date} оценочный лист.docx`);
  }, [
    props.graduationsInfo,
    takeDay,
    chairman,
    secretary,
    direction,
    group,
    students,
    props.degreeWorks,
  ]);

  return (
    <Box>
      <CommonButton onClick={onClick} disabled={props.disabled}>
        Оценочный лист
      </CommonButton>
    </Box>
  );
});

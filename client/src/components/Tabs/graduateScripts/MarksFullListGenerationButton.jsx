import { Box } from '@mui/system';
import { CommonButton } from '../../common/CommonButton';
import React from 'react';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { generateMarksListFull } from '../../../helpers/docx/generateMarksListFull';
import { toastError } from '../../../utils/toastSender';

export const MarksFullListGenerationButton = React.memo((props) => {
  const takeDay = useSelector((state) => state.ui.selectedTakeDayInfo.takeDay);

  const degreeWorks = useSelector((state) => state.degreeWorks).filter(
    (degreeWork) => degreeWork.takeDayId === takeDay.id
  );

  const { students, directions, groups, employees } = useSelector(
    (state) => state
  );

  const { chairman, secretary } = useSelector(
    (state) => state.ui.selectedTakeDayInfo.employees
  );

  const onClick = React.useCallback(async () => {
    const takeDayStudents = degreeWorks.map((degreeWork) =>
      students.find((student) => student.id === degreeWork.studentId)
    );

    if (!takeDayStudents.length) {
      toastError('Не добавлено ни одной работы!');
      return;
    }

    const group = groups.find(
      (group) => group.id === takeDayStudents[0].groupId
    );
    const direction = directions.find(
      (direction) => direction.id === group.directionId
    );

    const marksListOptions = {
      degreeWorks,
      takeDay,
      chairman,
      secretary,
      group,
      direction,
      students: takeDayStudents,
      allEmployees: employees,
    };

    const doc = await generateMarksListFull(marksListOptions);
    saveAs(doc, `${takeDay.date} оценочный лист.docx`);
  }, [takeDay, chairman, secretary, degreeWorks, students, employees]);

  return (
    <Box>
      <CommonButton onClick={onClick} disabled={props.disabled}>
        Оценочный лист
      </CommonButton>
    </Box>
  );
});

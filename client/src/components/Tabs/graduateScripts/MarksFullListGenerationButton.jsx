import { Box } from '@mui/system';
import { CommonButton } from '../../common/CommonButton';
import React from 'react';
import { saveAs } from 'file-saver';
import { generateMarksListFull } from '../../../helpers/docx/generateMarksListFull';
import { toastError } from '../../../utils/toastSender';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useDegreeWorksStore } from '../../../hooks/zustand/useDegreeWorksStore';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';
import { useDirectionsStore } from '../../../hooks/zustand/useDirectionsStore';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { useGraduateProcessStore } from '../../../hooks/zustand/useGraduateProcessStore';

export const MarksFullListGenerationButton = React.memo((props) => {
  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);

  const { degreeWorks } = useDegreeWorksStore((state) => state);
  const { students } = useStudentsStore((state) => state);
  const { directions } = useDirectionsStore((state) => state);
  const { employees } = useEmployeesStore((state) => state);

  const { chairman, secretary } = useGraduateProcessStore(
    (state) => state.graduateProcessEmployees
  );

  const onClick = React.useCallback(async () => {
    const takeDayStudents = degreeWorks.map((degreeWork) =>
      students.find((student) => student.id === degreeWork.studentId)
    );

    if (!takeDayStudents.length) {
      toastError('Не добавлено ни одной работы!');
      return;
    }

    const direction = directions.find(
      (direction) => direction.id === takeDayStudents[0].directionId
    );

    const marksListOptions = {
      degreeWorks,
      takeDay: selectedGraduateScript,
      chairman,
      secretary,
      direction,
      students: takeDayStudents,
      allEmployees: employees,
    };

    const doc = await generateMarksListFull(marksListOptions);
    saveAs(doc, `${selectedGraduateScript.date} оценочный лист.docx`);
  }, [
    selectedGraduateScript,
    chairman,
    secretary,
    degreeWorks,
    students,
    employees,
  ]);

  return (
    <Box>
      <CommonButton onClick={onClick} disabled={props.disabled}>
        Оценочный лист
      </CommonButton>
    </Box>
  );
});

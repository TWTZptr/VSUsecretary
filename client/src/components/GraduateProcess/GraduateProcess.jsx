import React from 'react';
import { Box } from '@mui/system';
import { useDegreeWork } from '../../hooks/useDegreeWork';
import { GraduateProcessStudentsList } from './GraduateProcessStudentsList';
import { useGraduateProcessStore } from '../../hooks/zustand/useGraduateProcessStore';
import { DegreeWorksEditor } from '../common/degreeWork/DegreeWorksEditor';
import { GraduateProcessDegreeWorkInfo } from './GraduateProcessDegreeWorkInfo';
import { useCommonStore } from '../../hooks/zustand/useCommonStore';
import { CommonButton } from '../common/CommonButton';
import { completeGraduateScript } from '../../services/graduateScriptsService';

const flexSx = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
};

const outerSx = {
  textAlign: 'left',
};

const buttonSx = {
  margin: '15px',
};

export const GraduateProcess = React.memo(() => {
  const [selectedDegreeWork, degreeWorkHandlers] = useDegreeWork();
  const { students, setSelectedStudent, selectedStudent, updateDegreeWork } =
    useGraduateProcessStore((state) => state);

  const { startedGraduateScript, startGraduateScript } = useCommonStore(
    (state) => state
  );

  const onStudentSelect = React.useCallback(
    (student) => {
      if (selectedDegreeWork.id) {
        updateDegreeWork(selectedDegreeWork, startedGraduateScript.id);
      }

      degreeWorkHandlers.setDegreeWork(student.degreeWork);
      setSelectedStudent(student);
    },
    [
      degreeWorkHandlers,
      setSelectedStudent,
      selectedDegreeWork,
      updateDegreeWork,
      startedGraduateScript.id,
    ]
  );

  const onEndProcess = React.useCallback(async () => {
    if (selectedDegreeWork.id) {
      updateDegreeWork(selectedDegreeWork, startedGraduateScript.id);
    }

    await completeGraduateScript(startedGraduateScript.id);
    startGraduateScript(null);
  }, [
    startGraduateScript,
    selectedDegreeWork,
    startedGraduateScript.id,
    updateDegreeWork,
  ]);

  return (
    <Box sx={outerSx}>
      <Box sx={flexSx}>
        <DegreeWorksEditor
          localDegreeWork={selectedDegreeWork}
          handlers={degreeWorkHandlers}
          disabled
        />
        <GraduateProcessDegreeWorkInfo
          localDegreeWork={selectedDegreeWork}
          handlers={degreeWorkHandlers}
        />
        <GraduateProcessStudentsList
          students={students}
          onSelect={onStudentSelect}
          selectedStudent={selectedStudent}
        />
      </Box>
      <Box sx={buttonSx}>
        <CommonButton onClick={onEndProcess}>Завершить защиту</CommonButton>
      </Box>
    </Box>
  );
});

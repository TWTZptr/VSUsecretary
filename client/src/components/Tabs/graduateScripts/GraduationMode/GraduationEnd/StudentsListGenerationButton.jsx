import React from 'react';
import { useSelector } from 'react-redux';
import { generateStudentListing } from '../../../../../helpers/docx/generateStudentListing';
import { Box } from '@mui/system';
import { CommonButton } from '../../../../common/CommonButton';
import { ToastContainer } from 'react-toastify';
import { saveAs } from 'file-saver';
import { toastError } from '../../../../../utils/toastSender';
import { formatPerson } from '../../../../../helpers/formatters';

export const StudentsListGenerationButton = React.memo((props) => {
  const group = useSelector((state) => state.ui.selectedGroup);
  const allDirections = useSelector((state) => state.directions);
  const allStudents = useSelector((state) => state.students);
  const allDegreeWorks = useSelector((state) => state.degreeWorks);

  const onClick = React.useCallback(async () => {
    const students = allStudents.filter(
      (student) => student.groupId === group.id
    );
    const direction = allDirections.find(
      (direction) => direction.id === group.directionId
    );

    const errors = [];
    const degreeWorks = students.map((student) => {
      const degreeWork = allDegreeWorks.find(
        (degreeWork) => degreeWork.studentId === student.id
      );
      if (!degreeWork) {
        errors.push(`${formatPerson(student)} не имеет ВКР`);
      }

      return degreeWork;
    });

    if (errors.length) {
      for (const err of errors) {
        toastError(err);
      }
    }

    const groupListingOptions = {
      students,
      direction,
      group,
      degreeWorks,
    };

    const doc = await generateStudentListing(groupListingOptions);
    saveAs(doc, 'doc.docx');
  }, [group, allDirections, allStudents, allDegreeWorks]);

  return (
    <Box>
      <CommonButton onClick={onClick} disabled={props.disabled}>
        Список студентов
      </CommonButton>
    </Box>
  );
});

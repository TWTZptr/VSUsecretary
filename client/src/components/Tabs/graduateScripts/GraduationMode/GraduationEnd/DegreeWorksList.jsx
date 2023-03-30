import { saveAs } from 'file-saver';
import React from 'react';
import { useSelector } from 'react-redux';
import { ListItem } from './ListItem';
import { CommonList } from '../../../../common/CommonList';
import { generateAppendixToTheProtocol } from '../../../../../helpers/docx/generateAppendixToTheProtocol';

export const DegreeWorksList = React.memo((props) => {
  const students = useSelector((state) => state.students);
  const takeDay = useSelector((state) => state.ui.startedTakeDay);
  const takeDayEmployees = useSelector((state) => state.graduation.employees);
  const employees = useSelector((state) => state.employees);

  const generateAppendix = React.useCallback(
    async (degreeWork, student) => {
      const supervisor = employees.find(
        (employee) => employee.id === degreeWork.supervisorId
      );

      let reviewer = null;
      if (degreeWork.reviewerId) {
        reviewer = employees.find(
          (employee) => employee.id === degreeWork.reviewerId
        );
      }

      const graduation = props.graduations.get(degreeWork.id);

      const doc = await generateAppendixToTheProtocol({
        degreeWork,
        student,
        takeDay,
        supervisor,
        chairman: takeDayEmployees.chairman,
        secretary: takeDayEmployees.secretary,
        graduation,
        reviewer,
        number: props.number,
      });
      saveAs(doc, 'doc.docx');
    },
    [employees, takeDayEmployees, props.graduations, takeDay]
  );

  return (
    <CommonList
      sx={React.useMemo(
        () => ({
          borderRadius: '2px',
          borderWidth: 0,
          maxWidth: '600px',
        }),
        []
      )}
    >
      {props.degreeWorks.map((degreeWork) => {
        const student = students.find(
          (student) => student.id === degreeWork.studentId
        );
        return (
          <ListItem
            degreeWork={degreeWork}
            generate={generateAppendix}
            student={student}
            key={degreeWork.id}
            number={props.number}
          />
        );
      })}
    </CommonList>
  );
});

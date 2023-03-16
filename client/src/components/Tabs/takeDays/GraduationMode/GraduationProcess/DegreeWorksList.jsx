import { DefaultList } from '../../../../common/DefaultList';
import React from 'react';
import { DegreeWorkListItem } from '../../../../common/degreeWork/DegreeWorkListItem';
import { formatPerson } from '../../../../../helpers/formatters';
import { useSelector } from 'react-redux';

export const DegreeWorksList = React.memo((props) => {
  const students = useSelector((state) => state.students);

  return (
    <DefaultList sx={{ width: 'auto' }}>
      {props.degreeWorks.map((degreeWork) => {
        const student = students.find(
          (student) => student.id === degreeWork.studentId
        );

        return (
          <DegreeWorkListItem
            degreeWork={degreeWork}
            onClick={props.onSelect}
            selected={props.selectedDegreeWork.id === degreeWork.id}
            key={degreeWork.id}
            name={`${formatPerson(student)} - ${degreeWork.theme}`}
          />
        );
      })}
    </DefaultList>
  );
});

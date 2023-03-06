import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStudent } from '../../../redux/slices/uiSlice';
import { DefaultList } from '../../common/DefaultList';
import { StudentListItem } from './StudentListItem';

export const StudentList = (props) => {
  const dispatch = useDispatch();
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);

  const students = useSelector((state) => state.students);

  return (
    <DefaultList>
      {students.map((student) => {
        return (
          <StudentListItem
            student={student}
            key={student.id}
            selected={student.id === selectedStudent.id}
            onClick={() => dispatch(selectStudent(student))}
          />
        );
      })}
    </DefaultList>
  );
};

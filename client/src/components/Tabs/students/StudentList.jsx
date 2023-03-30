import React from 'react';
import { DefaultList } from '../../common/DefaultList';
import { StudentListItem } from './StudentListItem';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';

export const StudentList = () => {
  const { students, selectedStudent, selectStudent } = useStudentsStore(
    (state) => state
  );

  const onClick = React.useCallback(
    (student) => {
      selectStudent(student);
    },
    [selectStudent]
  );

  return (
    <DefaultList>
      {students.map((student) => {
        return (
          <StudentListItem
            student={student}
            key={student.id}
            selected={student.id === selectedStudent.id}
            onClick={onClick}
          />
        );
      })}
    </DefaultList>
  );
};

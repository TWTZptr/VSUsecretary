import { TableBody } from '@mui/material';
import React from 'react';
import { StudentsTableItem } from './StudentsTableItem';
import { useDegreeWork } from '../../../../hooks/useDegreeWork';
import { useModal } from '../../../../hooks/useModal';
import { CommonModal } from '../../../common/CommonModal';
import { StudentDegreeWorkEditor } from './StudentDegreeWorkEditor';
import { INITIAL_DEGREE_WORK_STATE } from '../../../../constants';
import { useStudent } from '../../../../hooks/useStudent';

export const StudentsListItems = React.memo(
  ({ students, onDelete, disabled }) => {
    const [degreeWork, degreeWorksHandlers] = useDegreeWork();
    const [modalActive, activateModal, inactivateModal] = useModal();

    const [localDegreeWorkStudent, localStudentHandlers] = useStudent();

    const onDegreeWorkEdit = React.useCallback(
      (student) => {
        degreeWorksHandlers.setDegreeWork(
          student.degreeWork || {
            ...INITIAL_DEGREE_WORK_STATE,
            studentId: student.id,
          }
        );

        localStudentHandlers.setStudent(student);

        activateModal();
      },
      [localStudentHandlers, activateModal, degreeWorksHandlers]
    );

    return (
      <>
        <TableBody>
          {students.map((student) => (
            <StudentsTableItem
              key={student.id}
              student={student}
              onDelete={onDelete}
              disabled={disabled}
              onDegreeWorkEdit={onDegreeWorkEdit}
            />
          ))}
        </TableBody>
        <CommonModal active={modalActive} onClose={inactivateModal}>
          <StudentDegreeWorkEditor
            onClose={inactivateModal}
            handlers={degreeWorksHandlers}
            localDegreeWork={degreeWork}
            student={localDegreeWorkStudent}
            studentHandlers={localStudentHandlers}
          />
        </CommonModal>
      </>
    );
  }
);

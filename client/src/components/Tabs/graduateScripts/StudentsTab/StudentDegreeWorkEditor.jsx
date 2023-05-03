import React from 'react';
import { ModalBox } from '../../../common/ModalBox';
import { DegreeWorksEditor } from '../../../common/degreeWork/DegreeWorksEditor';
import { CommonButton } from '../../../common/CommonButton';
import {
  createDegreeWork,
  updateDegreeWork,
} from '../../../../services/degreeWorksService';
import { validateDegreeWork } from '../../degreeWorks/validators';
import { toastError } from '../../../../utils/toastSender';
import { validateStudent } from '../../students/validators';
import { updateStudent } from '../../../../services/studentsService';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';

const sx = {
  maxWidth: 700,
};

export const StudentDegreeWorkEditor = React.memo(
  ({ onClose, localDegreeWork, handlers, student, studentHandlers }) => {
    const { getAllStudents } = useGraduateScriptsStore((state) => state);

    const onSave = React.useCallback(
      async (event) => {
        event.preventDefault();
        try {
          validateDegreeWork(localDegreeWork);
          validateStudent(student);
          if (localDegreeWork.id) {
            await updateDegreeWork(localDegreeWork);
          } else {
            await createDegreeWork(localDegreeWork);
          }
          await updateStudent(student);
          await getAllStudents();
          onClose();
        } catch (err) {
          toastError(err.message);
        }
      },
      [student, onClose, localDegreeWork, getAllStudents]
    );

    const onPublicationsChange = React.useCallback(
      (event) => {
        studentHandlers.setPublications(event.target.value);
      },
      [studentHandlers]
    );

    return (
      <ModalBox sx={sx}>
        <form onSubmit={onSave}>
          <DegreeWorksEditor
            localDegreeWork={localDegreeWork}
            handlers={handlers}
            publications={student.publications}
            publicationsHandler={onPublicationsChange}
          />
          <CommonButton onClick={onSave} type="submit">
            Сохранить
          </CommonButton>
        </form>
      </ModalBox>
    );
  }
);

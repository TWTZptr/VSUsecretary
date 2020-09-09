import { Box } from '@mui/system';
import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { useStudent } from '../../../hooks/useStudent';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { ViewerBox } from '../../common/ViewerBox';
import { StudentEditor } from './StudentEditor';
import { CommonModal } from '../../common/CommonModal';
import { ModalAddStudent } from './ModalAddStudent';
import { toastError } from '../../../utils/toastSender';
import { validateStudent } from './validators';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';

export const StudentViewer = () => {
  const [modalActive, activateModal, inactivateModal] = useModal();
  const [student, studentHandlers] = useStudent();
  const { selectedStudent, removeStudentById, updateStudent } =
    useStudentsStore((state) => state);

  React.useEffect(() => {
    studentHandlers.setStudent(selectedStudent);
  }, [selectedStudent, studentHandlers]);

  const onDelete = React.useCallback(() => {
    removeStudentById(selectedStudent.id);
  }, [removeStudentById, selectedStudent.id]);

  const onSave = React.useCallback(() => {
    try {
      validateStudent(student);
      updateStudent(student);
    } catch (e) {
      toastError(e.message);
    }
  }, [updateStudent, student]);

  const disabled = !Boolean(selectedStudent.id);

  return (
    <ViewerBox>
      <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
        <StudentEditor
          handlers={studentHandlers}
          localStudent={student}
          disabled={disabled}
        />
        <EditorButtonBlock
          onSave={onSave}
          onDelete={onDelete}
          onAdd={activateModal}
          disabled={disabled}
        />
      </Box>
      <CommonModal active={modalActive} onClose={inactivateModal}>
        <ModalAddStudent onClose={inactivateModal} />
      </CommonModal>
    </ViewerBox>
  );
};

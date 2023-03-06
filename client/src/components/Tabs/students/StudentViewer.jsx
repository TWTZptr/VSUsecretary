import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../hooks/useModal';
import { useStudent } from '../../../hooks/useStudent';
import {
  deleteStudentAction,
  updateStudentAction,
} from '../../../redux/actions/studentsActions';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { ViewerBox } from '../../common/ViewerBox';
import { StudentEditor } from './StudentEditor';
import { CommonModal } from '../../common/CommonModal';
import { ModalAddStudent } from './ModalAddStudent';
import { toastError } from '../../../utils/toastSender';
import { validateStudent } from './validators';

export const StudentViewer = (props) => {
  const [modalActive, activateModal, inactivateModal] = useModal();
  const dispatch = useDispatch();
  const selectedStudent = useSelector((state) => state.ui.selectedStudent);
  const [student, studentHandlers] = useStudent();

  React.useEffect(() => {
    studentHandlers.setStudent(selectedStudent);
  }, [selectedStudent, studentHandlers]);

  const onDelete = (event) => {
    dispatch(deleteStudentAction(selectedStudent.id));
  };

  const onSave = () => {
    try {
      validateStudent(student);
      dispatch(updateStudentAction(student));
    } catch (e) {
      toastError(e.message);
    }
  };

  const disabled = !Boolean(selectedStudent.id);

  return (
    <ViewerBox>
      <Box sx={{ width: '100%' }}>
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

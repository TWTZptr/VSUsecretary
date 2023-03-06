import { useDispatch } from 'react-redux';
import { useStudent } from '../../../hooks/useStudent';
import { createStudentAction } from '../../../redux/actions/studentsActions';
import { CommonButton } from '../../common/CommonButton';
import { ModalBox } from '../../common/ModalBox';
import { StudentEditor } from './StudentEditor';
import React from 'react';
import { toastError } from '../../../utils/toastSender';
import { validateStudent } from './validators';

export const ModalAddStudent = React.forwardRef((props, ref) => {
  const [student, studentHandlers] = useStudent();
  const dispatch = useDispatch();

  const handleAdd = () => {
    try {
      validateStudent(student);
      dispatch(createStudentAction(student));
      props.onClose();
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <ModalBox ref={ref} sx={{ maxWidth: '700px' }}>
      <StudentEditor handlers={studentHandlers} localStudent={student} />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
});

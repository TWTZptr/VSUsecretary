import { useStudent } from '../../../hooks/useStudent';
import { CommonButton } from '../../common/CommonButton';
import { ModalBox } from '../../common/ModalBox';
import { StudentEditor } from './StudentEditor';
import React from 'react';
import { toastError } from '../../../utils/toastSender';
import { validateStudent } from './validators';
import { useStudentsStore } from '../../../hooks/zustand/useStudentsStore';
import { useCommonStore } from '../../../hooks/zustand/commonStore';

export const ModalAddStudent = React.forwardRef(({ onClose }, ref) => {
  const [student, studentHandlers] = useStudent();
  const { createStudent } = useStudentsStore((state) => state);
  const { currentYear } = useCommonStore((state) => state);

  const handleAdd = React.useCallback(() => {
    try {
      validateStudent(student);
      createStudent({ ...student, year: currentYear });
      onClose();
    } catch (e) {
      toastError(e.message);
    }
  }, [onClose, createStudent, student, currentYear]);

  return (
    <ModalBox ref={ref} sx={React.useMemo(() => ({ maxWidth: '700px' }), [])}>
      <StudentEditor handlers={studentHandlers} localStudent={student} />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
});

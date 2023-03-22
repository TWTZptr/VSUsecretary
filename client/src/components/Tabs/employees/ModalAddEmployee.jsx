import { useEmployee } from '../../../hooks/useEmployee';
import { ModalBox } from '../../common/ModalBox';
import { CommonButton } from '../../common/CommonButton';
import { EmployeeEditor } from './EmployeeEditor';
import { validateEmployee } from './validators';
import { toastError } from '../../../utils/toastSender';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import React from 'react';

export const ModalAddEmployee = (props) => {
  const [employee, employeeHandlers] = useEmployee();
  const { createEmployee } = useEmployeesStore((state) => state);

  const handleAdd = () => {
    try {
      validateEmployee(employee);
      createEmployee(employee);
      props.onClose();
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <ModalBox sx={React.useMemo(() => ({ maxWidth: 600 }))}>
      <EmployeeEditor handlers={employeeHandlers} localEmployee={employee} />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
};

import { useEmployee } from '../../../hooks/useEmployee';
import { ModalBox } from '../../common/ModalBox';
import { CommonButton } from '../../common/CommonButton';
import { EmployeeEditor } from './EmployeeEditor';
import { validateEmployee } from './validators';
import { toastError } from '../../../utils/toastSender';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import React from 'react';

export const ModalAddEmployee = ({ onClose }) => {
  const [employee, employeeHandlers] = useEmployee();
  const { createEmployee, selectEmployee } = useEmployeesStore(
    (state) => state
  );

  const handleAdd = React.useCallback(
    (e) => {
      e.preventDefault();
      try {
        validateEmployee(employee);
        createEmployee(employee);
        selectEmployee(employee);
        onClose();
      } catch (e) {
        toastError(e.message);
      }
    },
    [createEmployee, employee, selectEmployee, onClose]
  );

  return (
    <ModalBox sx={React.useMemo(() => ({ maxWidth: 600 }), [])}>
      <form onSubmit={handleAdd}>
        <EmployeeEditor handlers={employeeHandlers} localEmployee={employee} />
        <CommonButton onClick={handleAdd} type="submit">
          Добавить
        </CommonButton>
      </form>
    </ModalBox>
  );
};

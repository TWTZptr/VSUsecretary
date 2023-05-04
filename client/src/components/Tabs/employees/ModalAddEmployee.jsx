import { useEmployee } from '../../../hooks/useEmployee';
import { ModalBox } from '../../common/ModalBox';
import { CommonButton } from '../../common/CommonButton';
import { EmployeeEditor } from './EmployeeEditor';
import { validateEmployee } from './validators';
import { toastError } from '../../../utils/toastSender';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import React from 'react';

export const ModalAddEmployee = ({ onClose, onAddCallback }) => {
  const [employee, employeeHandlers] = useEmployee();
  const { createEmployee, selectEmployee } = useEmployeesStore(
    (state) => state
  );

  const handleAdd = React.useCallback(
    async (e) => {
      e.preventDefault();
      try {
        validateEmployee(employee);
        const newEmployee = await createEmployee(employee);
        selectEmployee(newEmployee);
        if (onAddCallback) {
          onAddCallback(newEmployee);
        }
        onClose();
      } catch (e) {
        toastError(e.message);
      }
    },
    [createEmployee, employee, selectEmployee, onClose, onAddCallback]
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

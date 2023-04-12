import { useEmployee } from '../../../hooks/useEmployee';
import React from 'react';
import { ViewerBox } from '../../common/ViewerBox';
import { Box } from '@mui/material';
import { EmployeeEditor } from './EmployeeEditor';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { CommonModal } from '../../common/CommonModal';
import { ModalAddEmployee } from './ModalAddEmployee';
import { useModal } from '../../../hooks/useModal';
import { validateEmployee } from './validators';
import { toastError } from '../../../utils/toastSender';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';

export const EmployeeViewer = () => {
  const [modalActive, activateModal, inactivateModal] = useModal();
  const {
    selectedEmployee,
    updateEmployee,
    removeEmployeeById,
    resetSelectedEmployee,
  } = useEmployeesStore((state) => state);
  const [employee, employeeHandlers] = useEmployee();

  React.useEffect(() => {
    employeeHandlers.setEmployee(selectedEmployee);
  }, [selectedEmployee, employeeHandlers]);

  const onDelete = React.useCallback(() => {
    removeEmployeeById(selectedEmployee.id);
    resetSelectedEmployee();
  }, [selectedEmployee, removeEmployeeById, resetSelectedEmployee]);

  const onSave = React.useCallback(() => {
    try {
      validateEmployee(employee);
      updateEmployee(employee);
    } catch (e) {
      toastError(e.message);
    }
  }, [employee, updateEmployee]);

  const disabled = !Boolean(selectedEmployee.id);

  return (
    <ViewerBox>
      <Box sx={React.useMemo(() => ({ width: '100%' }), [])}>
        <EmployeeEditor
          handlers={employeeHandlers}
          localEmployee={employee}
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
        <ModalAddEmployee onClose={inactivateModal} />
      </CommonModal>
    </ViewerBox>
  );
};

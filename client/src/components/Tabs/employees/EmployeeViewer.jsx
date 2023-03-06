import { useDispatch, useSelector } from 'react-redux';
import { useEmployee } from '../../../hooks/useEmployee';
import React from 'react';
import {
  updateEmployeeAction,
  deleteEmployeeAction,
} from '../../../redux/actions/employeesActions';
import { ViewerBox } from '../../common/ViewerBox';
import { Box } from '@mui/material';
import { EmployeeEditor } from './EmployeeEditor';
import { EditorButtonBlock } from '../../common/EditorButtonBlock';
import { CommonModal } from '../../common/CommonModal';
import { ModalAddEmployee } from './ModalAddEmployee';
import { useModal } from '../../../hooks/useModal';
import { validateEmployee } from './validators';
import { toastError } from '../../../utils/toastSender';

export const EmployeeViewer = () => {
  const [modalActive, activateModal, inactivateModal] = useModal();
  const dispatch = useDispatch();
  const selectedEmployee = useSelector((state) => state.ui.selectedEmployee);
  const [employee, employeeHandlers] = useEmployee();

  React.useEffect(() => {
    employeeHandlers.setEmployee(selectedEmployee);
  }, [selectedEmployee]);

  const onDelete = () => {
    dispatch(deleteEmployeeAction(selectedEmployee.id));
  };

  const onSave = () => {
    try {
      validateEmployee(employee);
      dispatch(updateEmployeeAction(employee));
    } catch (e) {
      toastError(e.message);
    }
  };

  const disabled = !Boolean(selectedEmployee.id);

  return (
    <ViewerBox>
      <Box sx={{ width: '100%' }}>
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

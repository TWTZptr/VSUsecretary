import { useEmployee } from '../../../hooks/useEmployee';
import { useDispatch } from 'react-redux';
import { createEmployeeAction } from '../../../redux/actions/employeesActions';
import { ModalBox } from '../../common/ModalBox';
import { CommonButton } from '../../common/CommonButton';
import { EmployeeEditor } from './EmployeeEditor';
import { validateEmployee } from './validators';
import { toastError } from '../../../utils/toastSender';

export const ModalAddEmployee = (props) => {
  const [employee, employeeHandlers] = useEmployee();
  const dispatch = useDispatch();

  const handleAdd = () => {
    try {
      validateEmployee(employee);
      dispatch(createEmployeeAction(employee));
      props.onClose();
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <ModalBox sx={{ maxWidth: 600 }}>
      <EmployeeEditor handlers={employeeHandlers} localEmployee={employee} />
      <CommonButton onClick={handleAdd}>Добавить</CommonButton>
    </ModalBox>
  );
};

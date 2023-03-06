import { useDispatch, useSelector } from 'react-redux';
import { DefaultList } from '../../common/DefaultList';
import { EmployeeListItem } from './EmployeeListItem';
import { selectEmployee } from '../../../redux/slices/uiSlice';

export const EmployeeList = (props) => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector((state) => state.ui.selectedEmployee);

  const employees = useSelector((state) => state.employees);

  return (
    <DefaultList>
      {employees.map((employee) => {
        return (
          <EmployeeListItem
            employee={employee}
            key={employee.id}
            selected={employee.id === selectedEmployee.id}
            onClick={() => dispatch(selectEmployee(employee))}
          />
        );
      })}
    </DefaultList>
  );
};

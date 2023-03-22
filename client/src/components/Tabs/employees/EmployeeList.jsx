import { DefaultList } from '../../common/DefaultList';
import { EmployeeListItem } from './EmployeeListItem';
import React from 'react';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';

export const EmployeeList = React.memo(() => {
  const { selectedEmployee, employees, selectEmployee } = useEmployeesStore(
    (state) => state
  );

  const onClick = React.useCallback(
    (employee) => {
      selectEmployee(employee);
    },
    [selectEmployee]
  );

  return (
    <DefaultList>
      {employees.map((employee) => {
        return (
          <EmployeeListItem
            employee={employee}
            key={employee.id}
            selected={employee.id === selectedEmployee.id}
            onClick={onClick}
          />
        );
      })}
    </DefaultList>
  );
});

import React from 'react';
import { EmployeesList } from './EmployeesTab/EmployeesList';
import { StudentsTable } from './StudentsTab/StudentsTable';

export const CurrentGraduateScriptTab = React.memo(({ index, disabled }) => {
  switch (index) {
    case 0:
      return <EmployeesList disabled={disabled} />;
    case 1:
      return <StudentsTable disabled={disabled} />;
    default:
      return <></>;
  }
});

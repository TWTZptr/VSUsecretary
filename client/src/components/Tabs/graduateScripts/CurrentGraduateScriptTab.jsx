import React from 'react';
import { EmployeesList } from './EmployeesTab/EmployeesList';
import { DegreeWorksList } from './DegreeWorksTab/DegreeWorksList';

export const CurrentGraduateScriptTab = React.memo(({ index, disabled }) => {
  switch (index) {
    case 0:
      return <EmployeesList disabled={disabled} />;
    case 1:
      return <DegreeWorksList />;
    default:
      return <></>;
  }
});

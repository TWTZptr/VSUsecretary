import React from 'react';
import { EmployeesSearchDropdown } from '../../common/EmployeesSearchDropdown/EmployeesSearchDropdown';

export const CommissionMember = React.memo(
  ({ index, onChange, currentMember, disabled }) => {
    const onSelfChange = React.useCallback(
      (member) => {
        onChange(index, member);
      },
      [onChange, index]
    );

    return (
      <EmployeesSearchDropdown
        onSelectEmployee={onSelfChange}
        selectedEmployee={currentMember}
        label={`Член комиссии ${index + 1}`}
        disabled={disabled}
      />
    );
  }
);

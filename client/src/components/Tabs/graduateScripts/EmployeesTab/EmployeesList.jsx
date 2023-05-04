import { Box } from '@mui/system';
import React from 'react';
import {
  removeEmployeeGraduateScript,
  setGraduateScriptChairman,
  setGraduateScriptCommissionMember,
  setGraduateScriptSecretary,
} from '../../../../services/graduateScriptsService';
import { useGraduateScriptsStore } from '../../../../hooks/zustand/useGraduateScriptsStore';
import { EmployeesSearchDropdown } from '../../../common/EmployeesSearchDropdown/EmployeesSearchDropdown';
import { CommissionMember } from './CommissionMember';
import { INITIAL_EMPLOYEE_STATE } from '../../../../constants';

export const EmployeesList = React.memo(({ disabled }) => {
  const {
    selectedGraduateScript,
    chairman,
    secretary,
    commission,
    setSecretary,
    setChairman,
    setCommission,
    setCommissionMember,
  } = useGraduateScriptsStore((state) => state);

  const handleChairmanEducateScriptChange = React.useCallback(
    (chairman) => {
      setGraduateScriptChairman(selectedGraduateScript.id, chairman.id).then(
        () => {
          setChairman(chairman);
        }
      );
    },
    [setChairman, selectedGraduateScript.id]
  );

  const commissionToDisplay = React.useMemo(() => {
    const com = new Array(5).fill(INITIAL_EMPLOYEE_STATE);
    for (const member of commission) {
      com[member.index] = member;
    }
    return com;
  }, [commission]);
  console.log(commissionToDisplay);

  const onDeleteEmployee = React.useCallback(
    (employee) =>
      removeEmployeeGraduateScript(selectedGraduateScript.id, employee.id).then(
        () => {
          if (chairman.id === employee.id) {
            setChairman(null);
            return;
          }

          if (secretary.id === employee.id) {
            setSecretary(null);
            return;
          }

          const memberIndex = commission.findIndex((m) => m.id === employee.id);
          setCommissionMember(null, memberIndex);
        }
      ),
    [
      selectedGraduateScript,
      chairman.id,
      commission,
      secretary.id,
      setChairman,
      setCommissionMember,
      setSecretary,
    ]
  );

  const handleSecretaryEducateScriptChange = React.useCallback(
    (secretary) => {
      setGraduateScriptSecretary(selectedGraduateScript.id, secretary.id).then(
        () => {
          setSecretary(secretary);
        }
      );
    },
    [selectedGraduateScript.id, setSecretary]
  );

  const handleCommissionMemberEducateScriptChange = React.useCallback(
    (index, member) => {
      setGraduateScriptCommissionMember(
        selectedGraduateScript.id,
        member.id,
        index
      ).then(() => {
        commission.splice(index, 1, member);
        setCommission(commission);
      });
    },
    [setCommission, selectedGraduateScript.id, commission]
  );

  const employeesToExclude = React.useMemo(
    () => [chairman, secretary, ...commission],
    [chairman, secretary, commission]
  );

  return (
    <Box
      sx={React.useMemo(
        () => ({
          width: '100%',
          marginTop: '10px',
        }),
        []
      )}
    >
      <EmployeesSearchDropdown
        onSelectEmployee={handleChairmanEducateScriptChange}
        selectedEmployee={chairman}
        label="Председатель"
        disabled={disabled}
        exclude={employeesToExclude}
        onDeleteEmployee={onDeleteEmployee}
      />
      <EmployeesSearchDropdown
        onSelectEmployee={handleSecretaryEducateScriptChange}
        selectedEmployee={secretary}
        label="Секретарь"
        disabled={disabled}
        exclude={employeesToExclude}
        onDeleteEmployee={onDeleteEmployee}
      />
      {commissionToDisplay.map((member, index) => (
        <CommissionMember
          key={index}
          disabled={disabled}
          index={index}
          currentMember={member}
          onChange={handleCommissionMemberEducateScriptChange}
          exclude={employeesToExclude}
          onDelete={onDeleteEmployee}
        />
      ))}
    </Box>
  );
});

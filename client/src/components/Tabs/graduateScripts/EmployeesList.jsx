import { Box } from '@mui/system';
import React from 'react';
import {
  setGraduateScriptChairman,
  setGraduateScriptCommissionMember,
  setGraduateScriptSecretary,
} from '../../../services/graduateScriptsService';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { EmployeesSearchDropdown } from '../../common/EmployeesSearchDropdown/EmployeesSearchDropdown';
import { CommissionMember } from './CommissionMember';

export const EmployeesList = React.memo(({ disabled }) => {
  const {
    selectedGraduateScript,
    chairman,
    secretary,
    commission,
    setSecretary,
    setChairman,
    setCommission,
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }),
        []
      )}
    >
      <Box>
        {commission.map((member, index) => (
          <CommissionMember
            key={index}
            disabled={disabled}
            index={index}
            currentMember={member}
            onChange={handleCommissionMemberEducateScriptChange}
          />
        ))}
      </Box>
      <Box>
        <EmployeesSearchDropdown
          onSelectEmployee={handleChairmanEducateScriptChange}
          selectedEmployee={chairman}
          label="Председатель"
          disabled={disabled}
        />
        <EmployeesSearchDropdown
          onSelectEmployee={handleSecretaryEducateScriptChange}
          selectedEmployee={secretary}
          label="Секретарь"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
});

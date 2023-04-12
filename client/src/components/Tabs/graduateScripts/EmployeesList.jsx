import { Box } from '@mui/system';
import React from 'react';
import {
  INITIAL_COMMISSION_STATE,
  INITIAL_EMPLOYEE_STATE,
} from '../../../constants';
import {
  removeEmployeeGraduateScript,
  setGraduateScriptToEmployee,
} from '../../../services/graduateScriptsService';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { useGraduateProcessStore } from '../../../hooks/zustand/useGraduateProcessStore';
import { EmployeesSearchDropdown } from '../../common/EmployeesSearchDropdown/EmployeesSearchDropdown';
import { CommissionMember } from './CommissionMember';

export const EmployeesList = ({ disabled }) => {
  const [currentCommission, setCurrentCommission] = React.useState(
    INITIAL_COMMISSION_STATE
  );
  const [currentSecretary, setCurrentSecretary] = React.useState(
    INITIAL_EMPLOYEE_STATE
  );
  const [currentChairman, setCurrentChairman] = React.useState(
    INITIAL_EMPLOYEE_STATE
  );

  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);
  const { graduateProcessEmployees } = useGraduateProcessStore(
    (state) => state
  );

  const allEmployees = useEmployeesStore((state) => state.employees);

  const handleChairmanEducateScriptChange = (chairman) => {
    if (currentChairman.id !== null) {
      removeEmployeeGraduateScript(
        selectedGraduateScript.id,
        currentChairman.id
      );
    }

    setGraduateScriptToEmployee(
      'Председатель',
      selectedGraduateScript.id,
      chairman.id
    ).then((res) => {
      setCurrentChairman(chairman);
    });
  };

  const handleSecretaryEducateScriptChange = (event) => {
    const secretaryId = event.target.value;
    const secretary = allEmployees.find(
      (secretary) => secretary.id === secretaryId
    );
    if (currentSecretary.id !== null) {
      removeEmployeeGraduateScript(
        selectedGraduateScript.id,
        currentSecretary.id
      );
    }

    setGraduateScriptToEmployee(
      'Секретарь',
      selectedGraduateScript.id,
      secretaryId
    ).then((res) => {
      setCurrentSecretary(secretary);
    });
  };

  const handleCommissionMemberEducateScriptChange = React.useCallback(
    (index, member) => {
      setCurrentCommission((prev) => {
        prev.splice(index, 1, member);
        return prev;
      });
    },
    [setCurrentCommission]
  );

  React.useEffect(() => {
    if (selectedGraduateScript.id) {
      if (graduateProcessEmployees.chairman) {
        setCurrentChairman(graduateProcessEmployees.chairman);
      } else {
        setCurrentChairman(INITIAL_EMPLOYEE_STATE);
      }

      if (graduateProcessEmployees.secretary) {
        setCurrentSecretary(graduateProcessEmployees.secretary);
      } else {
        setCurrentSecretary(INITIAL_EMPLOYEE_STATE);
      }

      if (graduateProcessEmployees.commission.length) {
        setCurrentCommission(graduateProcessEmployees.commission);
      } else {
        setCurrentCommission(INITIAL_COMMISSION_STATE);
      }
    } else {
      setCurrentChairman(INITIAL_EMPLOYEE_STATE);
      setCurrentSecretary(INITIAL_EMPLOYEE_STATE);
      setCurrentCommission(INITIAL_COMMISSION_STATE);
    }
  }, [graduateProcessEmployees, selectedGraduateScript.id]);

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
        {currentCommission.map((member, index) => (
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
          selectedEmployee={currentChairman}
          label="Председатель"
          disabled={disabled}
        />
        <EmployeesSearchDropdown
          onSelectEmployee={handleSecretaryEducateScriptChange}
          selectedEmployee={currentSecretary}
          label="Секретарь"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

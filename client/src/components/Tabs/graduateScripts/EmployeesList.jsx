import { Box } from '@mui/system';
import React from 'react';
import { INITIAL_EMPLOYEE_STATE } from '../../../constants';
import {
  removeEmployeeGraduateScript,
  setGraduateScriptToEmployee,
} from '../../../services/graduateScriptsService';
import { CommissionList } from './CommissionList/CommissionList';
import { CommonFormControl } from '../../common/CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { useEmployeesStore } from '../../../hooks/zustand/useEmployeesStore';
import { useGraduateProcessStore } from '../../../hooks/zustand/useGraduateProcessStore';
import { EmployeesSearchDropdown } from '../../common/EmployeesSearchDropdown/EmployeesSearchDropdown';

export const EmployeesList = (props) => {
  const [currentCommission, setCurrentCommission] = React.useState([]);
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

  const handleSecretaryTakeDayChange = (event) => {
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

  const handleAddEmployeeToCommission = (employee) => {
    setCurrentCommission([...currentCommission, employee]);
    setGraduateScriptToEmployee(
      'Член комиссии',
      selectedGraduateScript.id,
      employee.id
    );
  };

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
        setCurrentCommission([]);
      }
    } else {
      setCurrentChairman(INITIAL_EMPLOYEE_STATE);
      setCurrentSecretary(INITIAL_EMPLOYEE_STATE);
      setCurrentCommission([]);
    }
  }, [graduateProcessEmployees, selectedGraduateScript.id]);

  return (
    <Box
      sx={React.useMemo(
        () => ({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }),
        []
      )}
    >
      <EmployeesSearchDropdown
        onSelectEmployee={handleChairmanEducateScriptChange}
        selectedEmployee={currentChairman}
        label="Председатель"
        disabled={props.disabled}
      />
      {/*<CommonFormControl*/}
      {/*  sx={React.useMemo(() => ({ minWidth: '200px' }), [])}*/}
      {/*  disabled={props.disabled}*/}
      {/*>*/}
      {/*  <InputLabel>Секретарь</InputLabel>*/}
      {/*  <Select*/}
      {/*    label="Секретарь"*/}
      {/*    onChange={handleSecretaryTakeDayChange}*/}
      {/*    value={currentSecretary.id || ''}*/}
      {/*  >*/}
      {/*    {allEmployees.map((employee) => {*/}
      {/*      return (*/}
      {/*        <MenuItem value={employee.id} key={employee.id}>*/}
      {/*          {employee.lastname} {employee.name[0]}.{' '}*/}
      {/*          {employee.patronymic[0]}.*/}
      {/*        </MenuItem>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Select>*/}
      {/*</CommonFormControl>*/}
      <CommissionList
        currentCommission={currentCommission}
        setCommission={setCurrentCommission}
        takeDayId={selectedGraduateScript.id}
        commissionMembers={allEmployees}
        handleAdd={handleAddEmployeeToCommission}
        disabled={props.disabled}
      />
    </Box>
  );
};

import { Box } from '@mui/system';
import React from 'react';
import { INITIAL_EMPLOYEE_STATE } from '../../../constants';
import { useSelector } from 'react-redux';
import {
  removeEmployeeTakeDay,
  setTakeDayToEmployee,
} from '../../../services/graduateScriptsService';
import { CommissionList } from './CommissionList/CommissionList';
import { CommonFormControl } from '../../common/CommonFormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

export const EmployeesList = (props) => {
  const [currentCommission, setCurrentCommission] = React.useState([]);
  const [currentSecretary, setCurrentSecretary] = React.useState(
    INITIAL_EMPLOYEE_STATE
  );
  const [currentChairman, setCurrentChairman] = React.useState(
    INITIAL_EMPLOYEE_STATE
  );

  const selectedTakeDay = useSelector(
    (state) => state.ui.selectedTakeDayInfo.takeDay
  );

  const allEmployees = useSelector((state) => state.employees);

  const allSecretaries = allEmployees.filter(
    (employee) => employee.status === 'Секретарь'
  );

  const allChairmans = allEmployees.filter(
    (employee) => employee.status === 'Председатель'
  );

  const allCommissionMembers = allEmployees.filter(
    (employee) => employee.status === 'Член комиссии'
  );

  const handleChairmanTakeDayChange = (event) => {
    const chairmanId = event.target.value;
    const chairman = allChairmans.find(
      (chairman) => chairman.id === chairmanId
    );
    if (currentChairman.id !== null) {
      removeEmployeeTakeDay(selectedTakeDay.id, currentChairman.id);
    }

    setTakeDayToEmployee(selectedTakeDay.id, chairmanId).then((res) => {
      setCurrentChairman(chairman);
    });
  };

  const handleSecretaryTakeDayChange = (event) => {
    const secretaryId = event.target.value;
    const secretary = allSecretaries.find(
      (secretary) => secretary.id === secretaryId
    );
    if (currentSecretary.id !== null) {
      removeEmployeeTakeDay(selectedTakeDay.id, currentSecretary.id);
    }

    setTakeDayToEmployee(selectedTakeDay.id, secretaryId).then((res) => {
      setCurrentSecretary(secretary);
    });
  };

  const handleAddEmployeeToCommission = (employee) => {
    setCurrentCommission([...currentCommission, employee]);
    setTakeDayToEmployee(selectedTakeDay.id, employee.id);
  };

  const { employees } = useSelector((state) => state.ui.selectedTakeDayInfo);

  React.useEffect(() => {
    if (selectedTakeDay.id) {
      setCurrentCommission(employees.commission);
      setCurrentSecretary(employees.secretary);
      setCurrentChairman(employees.chairman);
    } else {
      setCurrentChairman(INITIAL_EMPLOYEE_STATE);
      setCurrentSecretary(INITIAL_EMPLOYEE_STATE);
      setCurrentCommission([]);
    }
  }, [employees]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <CommonFormControl
        sx={{ minWidth: '200px' }}
        disabled={selectedTakeDay.id === null}
      >
        <InputLabel>Председатель</InputLabel>
        <Select
          label="Председатель"
          onChange={handleChairmanTakeDayChange}
          value={currentChairman.id || ''}
          disabled={props.disabled}
        >
          {allChairmans.map((chairman) => {
            return (
              <MenuItem value={chairman.id} key={chairman.id}>
                {chairman.lastname} {chairman.name[0]}. {chairman.patronymic[0]}
                .
              </MenuItem>
            );
          })}
        </Select>
      </CommonFormControl>
      <CommonFormControl
        sx={{ minWidth: '200px' }}
        disabled={selectedTakeDay.id === null}
        disabled={props.disabled}
      >
        <InputLabel>Секретарь</InputLabel>
        <Select
          label="Секретарь"
          onChange={handleSecretaryTakeDayChange}
          value={currentSecretary.id || ''}
        >
          {allSecretaries.map((secretary) => {
            return (
              <MenuItem value={secretary.id} key={secretary.id}>
                {secretary.lastname} {secretary.name[0]}.{' '}
                {secretary.patronymic[0]}.
              </MenuItem>
            );
          })}
        </Select>
      </CommonFormControl>
      <CommissionList
        currentCommission={currentCommission}
        setCommission={setCurrentCommission}
        takeDayId={selectedTakeDay.id}
        commissionMembers={allCommissionMembers}
        handleAdd={handleAddEmployeeToCommission}
        disabled={props.disabled}
      />
    </Box>
  );
};

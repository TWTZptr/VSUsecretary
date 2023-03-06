import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployeesByTakeDayId } from '../../services/takeDaysService';
import { INITIAL_EMPLOYEE_STATE } from '../../constants';

export const selectTakeDay = createAsyncThunk(
  'takeDays/selectTakeDay',
  async (takeDay, thunkAPI) => {
    let employees = [];
    if (takeDay.id) {
      employees = await getEmployeesByTakeDayId(takeDay.id);
    }

    const chairman =
      employees.find((employee) => employee.status === 'Председатель') ||
      INITIAL_EMPLOYEE_STATE;
    const secretary =
      employees.find((employee) => employee.status === 'Секретарь') ||
      INITIAL_EMPLOYEE_STATE;
    const commission = employees.filter(
      (employee) => employee.status === 'Член комиссии'
    );
    return { takeDay, employees: { chairman, secretary, commission } };
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStudents } from '../../services/studentsService';
import { getEmployeesByTakeDayId } from '../../services/takeDaysService';

export const getTakeDayEmployeesAction = createAsyncThunk(
  'graduation/getEmployees',
  async (takeDayId, thunkAPI) => {
    const employees = await getEmployeesByTakeDayId(takeDayId);
    const secretary = employees.find(
      (employee) => employee.status === 'Секретарь'
    );
    const chairman = employees.find(
      (employee) => employee.status === 'Председатель'
    );
    const commissionMembers = employees.filter(
      (employee) => employee.status === 'Член комиссии'
    );

    return {
      secretary,
      chairman,
      commissionMembers,
    };
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllEmployees,
  updateEmployee,
  deleteEmployeeById,
  createEmployee,
} from '../../services/employeesService';
import { selectEmployee } from '../slices/uiSlice';
import { INITIAL_EMPLOYEE_STATE } from '../../constants';

export const getAllEmployeesAction = createAsyncThunk(
  'employees/getAll',
  async (_, thunkAPI) => {
    const employees = await getAllEmployees();
    return employees;
  }
);

export const updateEmployeeAction = createAsyncThunk(
  'employees/update',
  async (employeeToUpdate, thunkAPI) => {
    const employee = await updateEmployee(employeeToUpdate);
    thunkAPI.dispatch(selectEmployee(employee));
    return employee;
  }
);

export const deleteEmployeeAction = createAsyncThunk(
  'employees/delete',
  async (employeeId, thunkAPI) => {
    await deleteEmployeeById(employeeId);
    thunkAPI.dispatch(selectEmployee(INITIAL_EMPLOYEE_STATE));
    return employeeId;
  }
);

export const createEmployeeAction = createAsyncThunk(
  'employees/create',
  async (employeeToCreate, thunkAPI) => {
    const employee = await createEmployee(employeeToCreate);
    return employee;
  }
);

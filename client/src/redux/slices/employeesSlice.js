import { createSlice } from '@reduxjs/toolkit';
import {
  createEmployeeAction,
  deleteEmployeeAction,
  getAllEmployeesAction,
  updateEmployeeAction,
} from '../actions/employeesActions';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeesAction.fulfilled, (state, { payload }) => {
        state.push(...payload);
      })
      .addCase(updateEmployeeAction.fulfilled, (state, { payload }) => {
        const indexOfChangedEmployee = state.findIndex(
          (employee) => employee.id === payload.id
        );
        state[indexOfChangedEmployee] = payload;
      })
      .addCase(deleteEmployeeAction.fulfilled, (state, { payload }) => {
        const indexToDelete = state.findIndex(
          (employee) => employee.id === payload
        );
        state.splice(indexToDelete, 1);
      })
      .addCase(createEmployeeAction.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const employeeReducer = employeesSlice.reducer;

import { getTakeDayEmployeesAction } from '../actions/GraduationActions';
import { createSlice } from '@reduxjs/toolkit';

const graduationSlice = createSlice({
  name: 'graduation',
  initialState: {
    employees: { chairman: null, secretary: null, commissionMembers: [] },
    direction: {},
    students: [],
    group: {},
  },
  reducers: {
    setGraduationDirection: (state, { payload }) => {
      state.direction = payload;
    },
    addStudentsToGraduation: (state, { payload }) => {
      state.students.push(...payload);
    },
    setGraduationGroup: (state, { payload }) => {
      state.group = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTakeDayEmployeesAction.fulfilled,
      (state, { payload }) => {
        state.employees = payload;
      }
    );
  },
});

export const graduationReducer = graduationSlice.reducer;
export const {
  setGraduationDirection,
  addStudentsToGraduation,
  setGraduationGroup,
} = graduationSlice.actions;

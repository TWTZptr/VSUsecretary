import { createSlice } from '@reduxjs/toolkit';
import {
  INITIAL_DEGREE_WORK_STATE,
  INITIAL_DIRECTION_STATE,
  INITIAL_EMPLOYEE_STATE,
  INITIAL_GROUP_STATE,
  INITIAL_STUDENT_STATE,
  INITIAL_TAKE_DAY_STATE,
} from '../../constants';
import { getTakeDayEmployees, selectTakeDay } from '../actions/uiActions';

const ui = createSlice({
  name: 'ui',
  initialState: {
    selectedGroup: INITIAL_GROUP_STATE,
    selectedDirection: INITIAL_DIRECTION_STATE,
    selectedStudent: INITIAL_STUDENT_STATE,
    selectedEmployee: INITIAL_EMPLOYEE_STATE,
    selectedTakeDayInfo: {
      takeDay: INITIAL_TAKE_DAY_STATE,
      employees: {
        chairman: INITIAL_EMPLOYEE_STATE,
        secretary: INITIAL_EMPLOYEE_STATE,
        commission: [],
      },
    },
    selectedDegreeWork: INITIAL_DEGREE_WORK_STATE,
    startedTakeDay: INITIAL_TAKE_DAY_STATE,
  },
  reducers: {
    selectDirection: (state, { payload }) => {
      state.selectedDirection = payload;
    },
    selectGroup: (state, { payload }) => {
      state.selectedGroup = payload;
    },
    selectStudent: (state, { payload }) => {
      state.selectedStudent = payload;
    },
    selectEmployee: (state, { payload }) => {
      state.selectedEmployee = payload;
    },
    selectDegreeWork: (state, { payload }) => {
      state.selectedDegreeWork = payload;
    },
    startTakeDay: (state, { payload }) => {
      state.startedTakeDay = payload;
    },
    stopTakeDay: (state, { payload }) => {
      state.startedTakeDay = INITIAL_TAKE_DAY_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectTakeDay.fulfilled, (state, { payload }) => {
      state.selectedTakeDayInfo = payload;
    });
  },
});

export const uiReducer = ui.reducer;
export const {
  selectDirection,
  selectGroup,
  selectStudent,
  selectEmployee,
  selectDegreeWork,
  startTakeDay,
  stopTakeDay,
} = ui.actions;

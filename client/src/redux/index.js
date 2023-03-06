import { degreeWorksReducer } from './slices/degreeWorksSlice';
import { configureStore } from '@reduxjs/toolkit';
import { directionsReducer } from './slices/directionsSlice';
import { groupsReducer } from './slices/groupsSlice';
import { uiReducer } from './slices/uiSlice';
import { studentsReducer } from './slices/studentsSlice';
import { employeeReducer } from './slices/employeesSlice';
import { takeDaysReducer } from './slices/takeDaysSlice';
import { graduationReducer } from './slices/graduationSlice';

const store = configureStore({
  reducer: {
    degreeWorks: degreeWorksReducer,
    directions: directionsReducer,
    groups: groupsReducer,
    students: studentsReducer,
    ui: uiReducer,
    employees: employeeReducer,
    takeDays: takeDaysReducer,
    graduation: graduationReducer,
  },
});

export default store;

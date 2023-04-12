import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import {
  INITIAL_DEGREE_WORK_STATE,
  INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE,
} from '../../constants';

export const useGraduateProcessStore = create(
  devtools((set) => ({
    selectedDegreeWork: INITIAL_DEGREE_WORK_STATE,
    setSelectedDegreeWork: (degreeWork) =>
      set({ selectedDegreeWork: degreeWork }),
    graduateProcessEmployees: INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE,
    setGraduateProcessEmployees: (employees) =>
      set({ graduateProcessEmployees: employees }),
  }))
);

import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import {
  INITIAL_DEGREE_WORK_STATE,
  INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE,
} from '../../constants';
import {
  getEmployeesByGraduateScriptId,
  getStudentsByGraduateScriptId,
} from '../../services/graduateScriptsService';
import { updateDegreeWork } from '../../services/degreeWorksService';
import { updateStudent } from '../../services/studentsService';

export const useGraduateProcessStore = create(
  devtools((set, get) => ({
    selectedStudent: INITIAL_DEGREE_WORK_STATE,
    setSelectedStudent: (student) => set({ selectedStudent: student }),
    students: [],
    getAllStudents: async (graduateScriptId) => {
      const res = await getStudentsByGraduateScriptId(graduateScriptId);
      if (res) {
        set({ students: res });
      }
    },
    loadGraduateProcess: async (graduateScriptId) => {
      await get().getAllStudents(graduateScriptId);
      await get().getAllEmployees(graduateScriptId);
    },
    getAllEmployees: async (graduateScriptId) => {
      const employees = await getEmployeesByGraduateScriptId(graduateScriptId);
      get().setGraduateProcessEmployees(employees);
    },
    graduateProcessEmployees: INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE,
    setGraduateProcessEmployees: (employees) =>
      set({ graduateProcessEmployees: employees }),
    updateDegreeWork: async (degreeWork, graduateScriptId) => {
      const res = await updateDegreeWork(degreeWork);
      if (res) {
        get().getAllStudents(graduateScriptId);
      }
    },
    updateSelectedStudent: async (student) => {
      const res = await updateStudent({
        id: get().selectedStudent.id,
        ...student,
      });

      if (res) {
        set({
          selectedStudent: res,
          students: get().students.map((student) =>
            student.id === res.id ? res : student
          ),
        });
      }
    },
  }))
);

import {
  createGraduateScript,
  deleteGraduateScriptById,
  getAllGraduateScripts as getAllScripts,
  getEmployeesByGraduateScriptId,
  getStudentsByGraduateScriptId,
  updateGraduateScript,
} from '../../services/graduateScriptsService';
import {
  INITIAL_COMMISSION_STATE,
  INITIAL_EMPLOYEE_STATE,
  INITIAL_GRADUATE_SCRIPT_STATE,
} from '../../constants';
import { create as createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { swapStudentIndexes } from '../../services/studentsService';

export const useGraduateScriptsStore = createStore(
  devtools(
    (set, get) => ({
      getAllGraduateScripts: async (data) => {
        const res = await getAllScripts(data);
        if (res) {
          set({ graduateScripts: res });

          if (get().selectedGraduateScript.id) {
            const selectedGraduateScript = res.find(
              (script) => script.id === get().selectedGraduateScript.id
            );
            set({ selectedGraduateScript });
          }
        }
      },
      graduateScripts: [],
      createGraduateScript: async (graduateScript) => {
        const res = await createGraduateScript(graduateScript);
        if (res) {
          set({
            graduateScripts: [...get().graduateScripts, res],
            selectedGraduateScript: res,
          });
        }
      },
      removeGraduateScript: async (id) => {
        const res = await deleteGraduateScriptById(id);
        if (res) {
          set({
            graduateScripts: get().graduateScripts.filter(
              (script) => script.id !== id
            ),
            selectedGraduateScript: INITIAL_GRADUATE_SCRIPT_STATE,
            secretary: INITIAL_EMPLOYEE_STATE,
            chairman: INITIAL_EMPLOYEE_STATE,
            commission: INITIAL_COMMISSION_STATE,
          });
        }
      },
      updateGraduateScript: async (script) => {
        const res = await updateGraduateScript(script);
        if (res) {
          set({
            graduateScripts: get().graduateScripts.map((val) =>
              val.id === script.id ? res : val
            ),
            selectedGraduateScript: res,
          });
        }
      },
      selectedGraduateScript: INITIAL_GRADUATE_SCRIPT_STATE,
      resetSelectedGraduateScript: () =>
        set({ selectedGraduateScript: INITIAL_GRADUATE_SCRIPT_STATE }),
      selectGraduateScript: (graduateScript) => {
        set({ selectedGraduateScript: graduateScript });
        get().getAllEmployees();
        get().getAllStudents();
      },
      secretary: INITIAL_EMPLOYEE_STATE,
      chairman: INITIAL_EMPLOYEE_STATE,
      commission: INITIAL_COMMISSION_STATE,
      getAllStudents: async () => {
        const students = await getStudentsByGraduateScriptId(
          get().selectedGraduateScript.id
        );
        set({ students });
      },
      upStudent: async (student1) => {
        const student1Index = get().students.findIndex((s) => s === student1);
        if (!student1Index) {
          return;
        }

        const student2 = get().students[student1Index - 1];
        await swapStudentIndexes(student1, student2);
        await get().getAllStudents();
      },
      downStudent: async (student1) => {
        const student1Index = get().students.findIndex((s) => s === student1);
        if (student1Index === get().students.length - 1) {
          return;
        }

        const student2 = get().students[student1Index + 1];
        await swapStudentIndexes(student1, student2);
        await get().getAllStudents();
      },
      setSecretary: (secretary) =>
        set({ secretary: secretary || INITIAL_EMPLOYEE_STATE }),
      setChairman: (chairman) =>
        set({ chairman: chairman || INITIAL_EMPLOYEE_STATE }),
      setCommission: (commission) =>
        set({
          commission: commission.length ? commission : INITIAL_COMMISSION_STATE,
        }),
      removeCommissionMember: (employee, empId) => {
        const current = get().commission;
        set({ commission: current.filter((emp) => empId !== emp.id) });
      },
      addCommissionMember: (employee) => {
        const current = get().commission;
        set({ commission: [...current, employee] });
      },
      getAllEmployees: async () => {
        const selected = get().selectedGraduateScript;
        if (!selected.id) {
          return;
        }

        const employees = await getEmployeesByGraduateScriptId(selected.id);
        get().setSecretary(employees.secretary);
        get().setChairman(employees.chairman);
        get().setCommission(
          employees.commission.map((e) => (e ? e : INITIAL_EMPLOYEE_STATE))
        );
      },
      students: [],
    }),
    {
      name: 'GraduateScripts',
      serialize: { options: true },
      store: 'GraduateScripts',
    }
  )
);

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

export const useGraduateScriptsStore = createStore(
  devtools(
    (set, get) => ({
      getAllGraduateScripts: async (data) => {
        const res = await getAllScripts(data);
        set({ graduateScripts: res });
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
      setSecretary: (secretary) =>
        set({ secretary: secretary || INITIAL_EMPLOYEE_STATE }),
      setChairman: (chairman) =>
        set({ chairman: chairman || INITIAL_EMPLOYEE_STATE }),
      setCommission: (commission) =>
        set({
          commission: commission.length ? commission : INITIAL_COMMISSION_STATE,
        }),
      setCommissionMember: (employee, index) => {
        const current = get().commission;
        current[index] = employee || INITIAL_EMPLOYEE_STATE;
        set({ commission: current });
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

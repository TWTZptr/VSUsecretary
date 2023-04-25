import { create } from 'zustand';
import { getAllEducationLevels } from '../../services/common';
import { devtools } from 'zustand/middleware';

export const useCommonStore = create(
  devtools(
    (set) => {
      return {
        currentYear: new Date().getFullYear(),
        setCurrentYear: (year) => set({ currentYear: year }),
        startedGraduateScript: null,
        startGraduateScript: (graduateScript) =>
          set({
            startedGraduateScript: graduateScript,
          }),
        educationLevels: [],
        getAllEducationLevels: async () => {
          set({
            educationLevels: await getAllEducationLevels(),
          });
        },
      };
    },
    {
      name: 'CommonStore',
      serialize: { options: true },
      store: 'CommonStore',
    }
  )
);

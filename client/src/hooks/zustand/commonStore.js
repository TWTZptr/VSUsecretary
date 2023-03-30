import { create } from 'zustand';
import { getAllEducationLevels } from '../../services/common';

export const useCommonStore = create((set) => {
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
});

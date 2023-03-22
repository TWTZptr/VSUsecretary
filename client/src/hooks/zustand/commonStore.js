import { create } from 'zustand';

export const useCommonStore = create((set) => ({
  currentYear: new Date().getFullYear(),
  setCurrentYear: (year) => set({ currentYear: year }),
}));

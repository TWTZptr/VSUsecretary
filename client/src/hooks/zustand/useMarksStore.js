import { devtools } from 'zustand/middleware';
import { create as createStore } from 'zustand';
import { getAllMarks } from '../../services/marksService';

export const useMarksStore = createStore(
  devtools((set, get) => ({
    marks: [],
    getAllMarks: async () => {
      const marks = await getAllMarks();
      if (marks) {
        set({ marks });
      }
    },
  }))
);

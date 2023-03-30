import { create as createStore } from 'zustand';

// directions
// createDirection
// removeDirection
// updateDirection
// getAllDirections
// getDirectionById
// selectedDirection
// selectDirection
// resetSelectedDirection
export const createDefaultStore = (
  name,
  { create, update, remove, getAll },
  initVal
) => {
  const plural = name + 's';
  const cap = name.charAt(0).toUpperCase() + name.slice(1);
  const pluralCap = plural.charAt(0).toUpperCase() + plural.slice(1);

  return createStore((set, get) => ({
    [plural]: [],
    ['create' + cap]: async (item) => {
      const res = await create(item);
      if (res) {
        set({ [plural]: [...get()[plural], item] });
      }
    },
    ['remove' + cap + 'ById']: async (id) => {
      const res = await remove(id);
      if (res) {
        set({ [plural]: get()[plural].filter((val) => val.id !== id) });
      }
    },
    ['update' + cap]: async (item) => {
      const res = await update(item);
      if (res) {
        set({
          [plural]: get()[plural].map((val) =>
            val.id === item.id ? res : val
          ),
        });
      }
    },
    ['getAll' + pluralCap]: async () => {
      const res = await getAll();
      set({ [plural]: res });
    },
    ['get' + cap + 'ById']: (id) =>
      get()[plural].find((item) => item.id === id),
    ['selected' + cap]: initVal,
    ['select' + cap]: (val) => set({ ['selected' + cap]: val }),
    ['resetSelected' + cap]: () => set({ ['selected' + cap]: initVal }),
  }));
};
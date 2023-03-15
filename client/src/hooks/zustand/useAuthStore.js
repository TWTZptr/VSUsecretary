import { create } from 'zustand';
import {
  removeAccessTokenFromStorage,
  tryLogin,
  tryLogout,
  tryRefresh,
} from '../../services/authService';

const INIT_USER = {
  name: '',
  id: 0,
  role: {
    id: 0,
    name: '',
  },
};

export const useAuthStore = create((set) => {
  const loginUser = (user) => {
    set({ user, authenticated: true });
  };

  const logoutUser = (user) => {
    set({ user, authenticated: false });
  };

  return {
    user: INIT_USER,
    authenticated: false,
    ready: false,
    setUser: (user) => {
      set({ user });
    },
    login: async (credentials) => {
      const response = await tryLogin(credentials);
      if (response.ok) {
        loginUser(response.data.user);
      }

      return response;
    },
    refresh: async () => {
      const refreshed = await tryRefresh();
      if (!refreshed) {
        logoutUser();
        return false;
      }
      return true;
    },
    logout: async () => {
      const response = await tryLogout();
      if (response.ok) {
        logoutUser();
        removeAccessTokenFromStorage();
      }
    },
    getReady: () => {
      set({ ready: true });
    },
  };
});

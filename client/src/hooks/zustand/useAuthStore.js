import { create } from 'zustand';
import {
  removeAccessTokenFromStorage,
  tryLogin,
  tryLogout,
  tryRefresh,
} from '../../services/authService';
import { INIT_USER } from '../../constants';

export const useAuthStore = create((set) => {
  const loginUser = (user) => {
    set({ user, authenticated: true });
  };

  const logoutUser = () => {
    set({ user: INIT_USER, authenticated: false });
  };

  return {
    user: INIT_USER,
    authenticated: false,
    ready: false,
    loginUser: (user) => {
      loginUser(user);
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

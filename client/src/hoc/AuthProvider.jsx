import React from 'react';
import { getAccessTokenFromStorage, getSelf } from '../services/authService';
import { useAuthStore } from '../hooks/zustand/useAuthStore';

export const AuthProvider = ({ children }) => {
  const auth = useAuthStore();

  React.useEffect(() => {
    const fetchAuth = async () => {
      let tokenReady = getAccessTokenFromStorage();

      if (tokenReady) {
        const response = await getSelf();
        if (response.ok) {
          auth.setUser(response.data);
        } else {
          tokenReady = false;
        }
      }

      if (!tokenReady && (await auth.refresh())) {
        const response = await getSelf();
        if (response.ok) {
          auth.setUser(response.data);
        }
      }
      auth.getReady();
    };

    fetchAuth();
  }, []);

  return <>{children}</>;
};

import { useAuthStore } from '../hooks/zustand/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const auth = useAuthStore((state) => state);
  const location = useLocation();

  if (!auth.ready) {
    return <></>;
  }

  if (!auth.authenticated) {
    return <Navigate to="login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

import { useAuthStore } from '../hooks/zustand/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireUnauth = ({ children }) => {
  const auth = useAuthStore((state) => state);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  if (auth.authenticated) {
    return <Navigate to={fromPage} replace />;
  }

  return <>{children}</>;
};

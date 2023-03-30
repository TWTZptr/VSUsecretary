import { useAuthStore } from '../hooks/zustand/useAuthStore';
import { USER_ROLES } from '../constants';
import { Navigate, useLocation } from 'react-router-dom';

export const UserMainPage = () => {
  const auth = useAuthStore();
  const location = useLocation();

  switch (auth.user.role.name) {
    case USER_ROLES.ADMIN:
      return <></>;

    case USER_ROLES.SECRETARY:
      return <Navigate to="/directions" state={{ from: location }} replace />;

    case USER_ROLES.DEANERY:
      return <></>;

    default:
      return <></>;
  }
};
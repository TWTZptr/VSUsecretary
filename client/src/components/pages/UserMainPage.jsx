import { useAuthStore } from '../../hooks/zustand/useAuthStore';
import { USER_ROLES } from '../../constants';
import SecretaryMainPage from './SecretaryMainPage';

export const UserMainPage = () => {
  const auth = useAuthStore();

  switch (auth.user.role.name) {
    case USER_ROLES.ADMIN:
      return <></>;

    case USER_ROLES.SECRETARY:
      return <SecretaryMainPage />;

    case USER_ROLES.DEANERY:
      return <></>;

    default:
      return <></>;
  }
};

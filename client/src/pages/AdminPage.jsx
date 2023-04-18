import { Box } from '@mui/system';
import React from 'react';
import { getAllRoles } from '../services/rolesService';
import { useQuery } from '@tanstack/react-query';
import { ChangeUserPasswordButton } from '../components/AdminPanel/ChangeUserPasswordButton';
import { useModal } from '../hooks/useModal';
import { CommonModal } from '../components/common/CommonModal';
import { ModalChangePassword } from '../components/AdminPanel/ModalChangePassword';
import { changePassword } from '../services/usersService';
import { toastError } from '../utils/toastSender';

export const AdminPage = React.memo(() => {
  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
    initialData: [],
  });

  const [modalActive, activateModal, inactivateModal] = useModal();
  const [selectedRole, setSelectedRole] = React.useState(null);

  const onClick = React.useCallback(
    (role) => {
      setSelectedRole(role);
      activateModal();
    },
    [activateModal]
  );

  const onPasswordChange = React.useCallback(
    async (password, adminPassword) => {
      const res = await changePassword({
        userId: selectedRole.id,
        password,
        adminPassword,
      });

      if (res.ok) {
        inactivateModal();
        return;
      }

      toastError(res.msg);
    },
    [selectedRole, inactivateModal]
  );

  return (
    <Box
      sx={React.useMemo(
        () => ({
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 50px',
          maxWidth: '600px',
        }),
        []
      )}
    >
      {roles.map((role) => (
        <ChangeUserPasswordButton role={role} onClick={onClick} key={role.id} />
      ))}
      <CommonModal active={modalActive} onClose={inactivateModal}>
        <ModalChangePassword
          onClose={inactivateModal}
          onSave={onPasswordChange}
        />
      </CommonModal>
    </Box>
  );
});

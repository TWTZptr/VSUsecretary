import { useAuthStore } from '../../hooks/zustand/useAuthStore';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '../../services/rolesService';
import { RoleSelector } from '../common/selectors/RoleSelector';
import { USER_ROLES } from '../../constants';
import { CommonTextField } from '../common/CommonTextField';

export const LoginPage = React.memo(() => {
  const auth = useAuthStore((store) => store);
  const navigate = useNavigate();
  const [err, setErr] = React.useState('');

  const [inputData, setInputData] = React.useState({
    role: '',
    password: '',
  });

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
    initialData: [],
  });

  const rolesText = React.useMemo(() => {
    if (roles.length) {
      setInputData((prev) => ({ ...prev, role: USER_ROLES.SECRETARY }));
    }
    return roles.map((role) => role.name);
  }, [roles]);

  const onRoleChange = React.useCallback((value) => {
    setErr('');
    setInputData((prev) => ({ ...prev, role: value }));
  }, []);

  const onPasswordChange = React.useCallback((event) => {
    setErr('');
    const value = event.currentTarget.value;
    setInputData((prev) => ({ ...prev, password: value }));
  }, []);

  const onSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      if (!inputData.password) {
        setErr('Пароль не должен быть пустым!');
        return;
      }

      const res = await auth.login(inputData);
      if (res.ok) {
        navigate('/');
      }

      if (res.status === 401) {
        setErr('Неверный пароль!');
      }

      setErr('Неизвестная ошибка');
    },
    [inputData, auth, navigate]
  );

  return (
    <Box
      sx={React.useMemo(
        () => ({
          backgroundColor: 'white',
          borderRadius: '20px',
          borderStyle: 'solid',
          borderColor: 'black',
          borderWidth: '1px',
          padding: '30px',
          maxWidth: '400px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '10% auto 0 auto',
          opacity: '100%',
        }),
        []
      )}
    >
      <form onSubmit={onSubmit} className="login-form">
        <Box>
          <RoleSelector
            values={rolesText}
            value={inputData.role}
            onChange={onRoleChange}
            name="roleId"
          />
          <CommonTextField
            label="Пароль"
            type="password"
            id="password"
            onChange={onPasswordChange}
            value={inputData.password}
            sx={React.useMemo(() => ({ width: '65%' }), [])}
            name="Пароль"
          />
        </Box>

        <button type="submit">Войти</button>
      </form>
      <div className="error-container">{err}</div>
    </Box>
  );
});

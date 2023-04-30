import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { CommonButton } from '../common/CommonButton';
import { useAuthStore } from '../../hooks/zustand/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from '../../constants';
import { YearSelect } from './YearSelect';

const sx = {
  fontSize: '24px',
  marginRight: '36px',
};

const headlineSx = {
  width: '100%',
  height: '60px',
  backgroundColor: 'rgba(143,143,143,0.65)',
  padding: '10px 20px',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
};

const flexSx = {
  display: 'flex',
  flexDirection: 'row',
};

export const Header = React.memo(() => {
  const { logout, user, authenticated } = useAuthStore((store) => store);
  const navigate = useNavigate();

  const onLogout = React.useCallback(async () => {
    await logout();
    navigate('/login');
  }, [logout, navigate]);

  if (!authenticated) {
    return <></>;
  }

  return (
    <header>
      <Box sx={headlineSx}>
        <Box>
          <YearSelect />
        </Box>
        <Box sx={flexSx}>
          <Typography sx={sx}>
            Вы вошли как: <i>{user?.name}</i>
          </Typography>
          <CommonButton onClick={onLogout}>Выйти</CommonButton>
        </Box>
      </Box>
    </header>
  );
});

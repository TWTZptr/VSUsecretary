import React from 'react';
import { Box } from '@mui/system';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useCommonStore } from '../../hooks/zustand/commonStore';
import { CommonButton } from '../common/CommonButton';
import { useAuthStore } from '../../hooks/zustand/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const Header = React.memo(() => {
  const { currentYear, setCurrentYear } = useCommonStore((state) => state);
  const { logout, user } = useAuthStore((store) => store);
  const navigate = useNavigate();

  const onYearChange = React.useCallback(
    (event) => {
      setCurrentYear(event.target.value);
    },
    [setCurrentYear]
  );

  const from = new Date().getFullYear() - 10;
  const years = Array.from(
    { length: 20 },
    (_, index) => index + from
  ).reverse();

  const onLogout = React.useCallback(async () => {
    await logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <header>
      <Box
        sx={React.useMemo(
          () => ({
            width: '100%',
            height: '60px',
            backgroundColor: 'rgba(143,143,143,0.65)',
            padding: '10px 20px',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }),
          []
        )}
      >
        <Box>
          <FormControl fullWidth>
            <InputLabel>Год</InputLabel>
            <Select
              label="Год"
              onChange={onYearChange}
              value={currentYear}
              sx={React.useMemo(
                () => ({
                  maxHeight: '44px',
                }),
                []
              )}
              MenuProps={React.useMemo(
                () => ({
                  PaperProps: {
                    style: {
                      maxHeight: '300px',
                    },
                  },
                }),
                []
              )}
            >
              {years.map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={React.useMemo(
            () => ({
              display: 'flex',
              flexDirection: 'row',
            }),
            []
          )}
        >
          <Typography
            sx={React.useMemo(
              () => ({
                fontSize: '24px',
                marginRight: '36px',
              }),
              []
            )}
          >
            Вы вошли как: <i>{user?.name}</i>
          </Typography>
          <CommonButton onClick={onLogout}>Выйти</CommonButton>
        </Box>
      </Box>
    </header>
  );
});

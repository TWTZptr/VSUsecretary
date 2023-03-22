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

export const Header = React.memo(() => {
  const { currentYear, setCurrentYear } = useCommonStore((state) => state);

  const onYearChange = React.useCallback((event) => {
    setCurrentYear(event.target.value);
  }, []);

  const from = new Date().getFullYear() - 50;
  const years = Array.from({ length: 100 }, (_, index) => index + from);

  return (
    <header>
      <Box
        sx={React.useMemo(() => ({
          width: '100%',
          height: '60px',
          backgroundColor: 'rgba(143,143,143,0.65)',
          padding: '5px 20px',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }))}
      >
        <Box>
          <Typography
            sx={React.useMemo(() => ({
              fontSize: '22px',
            }))}
          >
            <FormControl sx={React.useMemo(() => ({}), [])}>
              <InputLabel>Год</InputLabel>
              <Select label="Год" onChange={onYearChange} value={currentYear}>
                {years.map((year) => (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={React.useMemo(
              () => ({
                fontSize: '24px',
              }),
              []
            )}
          >
            Система "Секретарь ГЭК" v1.0.0
          </Typography>
        </Box>
      </Box>
    </header>
  );
});

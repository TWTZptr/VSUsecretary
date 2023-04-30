import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { SECTIONS_MAP } from '../components/app/sectionsMap';
import { useAuthStore } from '../hooks/zustand/useAuthStore';
import { USER_ROLES } from '../constants';

export const SecretaryTabs = React.memo(({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore((state) => state);
  const [selectedSection, setSelectedSection] = React.useState(
    SECTIONS_MAP[location.pathname]
  );

  const onChange = React.useCallback(
    (event, newValue) => {
      setSelectedSection(newValue);
    },
    [setSelectedSection]
  );

  const onTabClick = React.useCallback(
    (event) => {
      navigate(event.target.dataset.nav);
    },
    [navigate]
  );

  return (
    <Box
      sx={React.useMemo(
        () => ({
          display: 'flex',
          height: '100%',
        }),
        []
      )}
    >
      <Tabs
        orientation="vertical"
        sx={React.useMemo(
          () => ({
            borderRight: 1,
            borderColor: 'divider',
            width: 200,
            height: '100%',
          }),
          []
        )}
        onChange={onChange}
        value={selectedSection}
        centered
      >
        <Tab label="Направления" onClick={onTabClick} data-nav="/directions" />
        <Tab label="Работы" onClick={onTabClick} data-nav="/degree-works" />
        <Tab label="Студенты" onClick={onTabClick} data-nav="/students" />
        <Tab label="Сотрудники" onClick={onTabClick} data-nav="/employees" />
        <Tab
          label="Сценарии защиты"
          onClick={onTabClick}
          data-nav="/graduate-scripts"
        />
        <Tab label="Файлы" onClick={onTabClick} data-nav="/files" />
        {user.role.name === USER_ROLES.ADMIN ? (
          <Tab label="Смена паролей" onClick={onTabClick} data-nav="/" />
        ) : (
          ''
        )}
      </Tabs>
      <Box sx={React.useMemo(() => ({ margin: '30px', width: '100%' }), [])}>
        {children}
      </Box>
    </Box>
  );
});

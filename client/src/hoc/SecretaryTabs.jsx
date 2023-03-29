import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { SECTIONS_MAP } from '../components/app/sectionsMap';

export const SecretaryTabs = React.memo(({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
      </Tabs>
      <Box sx={React.useMemo(() => ({ margin: '30px', width: '100%' }), [])}>
        {children}
      </Box>
    </Box>
  );
});

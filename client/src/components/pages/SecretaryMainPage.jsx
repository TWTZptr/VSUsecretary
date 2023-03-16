import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Students } from '../Tabs/students/Students';
import { TakeDays } from '../Tabs/takeDays/TakeDays';
import { Employees } from '../Tabs/employees/Employees';
import { DegreeWorksPage } from '../Tabs/degreeWorks/DegreeWorksPage';
import { DirectionsPage } from '../Tabs/directions/DirectionsPage';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';

const SecretaryMainPage = () => {
  const [selectedSection, setSelectedSection] = React.useState(0);
  const navigate = useNavigate();

  const onChange = (event, newValue) => {
    setSelectedSection(newValue);
  };

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
        <Tab label="Работы" onClick={onTabClick} data-nav="/degree-works" />
        <Tab label="Студенты" onClick={onTabClick} data-nav="/students" />
        <Tab label="Сотрудники" onClick={onTabClick} data-nav="/employees" />
        <Tab label="Дни защиты" onClick={onTabClick} data-nav="take-days" />
        <Tab label="Направления" onClick={onTabClick} data-nav="directions" />
        <Tab label="Направления" onClick={onTabClick} data-nav="directions" />
      </Tabs>
      <Box sx={React.useMemo(() => ({ margin: '30px', width: '100%' }), [])}>
        <DegreeWorksPage />
        <Students value={selectedSection} index={1} />
        <Employees value={selectedSection} index={2} />
        <TakeDays value={selectedSection} index={3} />
        <DirectionsPage value={selectedSection} index={4} />
      </Box>
    </Box>
  );
};

export default SecretaryMainPage;

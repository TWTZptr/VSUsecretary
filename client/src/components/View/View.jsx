import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Directions } from '../Tabs/directions/Directions';
import { Groups } from '../Tabs/groups/Groups';
import { Students } from '../Tabs/students/Students';
import { TakeDays } from '../Tabs/takeDays/TakeDays';
import { Employees } from '../Tabs/employees/Employees';
import { DegreeWorks } from '../Tabs/degreeWorks/DegreeWorks';

const View = (props) => {
  const [selectedSection, setSelectedSection] = React.useState(0);

  const onChange = (event, newValue) => {
    setSelectedSection(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          width: 200,
          height: '100%',
        }}
        onChange={onChange}
        value={selectedSection}
        centered
      >
        <Tab label="Работы" />
        <Tab label="Студенты" />
        <Tab label="Сотрудники" />
        <Tab label="Дни защиты" />
        <Tab label="Группы" />
        <Tab label="Направления" />
      </Tabs>
      <Box sx={{ margin: '30px', width: '100%' }}>
        <DegreeWorks value={selectedSection} index={0} />
        <Students value={selectedSection} index={1} />
        <Employees value={selectedSection} index={2} />
        <TakeDays value={selectedSection} index={3} />
        <Groups value={selectedSection} index={4} />
        <Directions value={selectedSection} index={5} />
      </Box>
    </Box>
  );
};

export default View;

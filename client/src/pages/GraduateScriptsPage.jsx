import { Box } from '@mui/system';
import React from 'react';
import { GraduateScriptViewer } from '../components/Tabs/graduateScripts/GraduateScriptViewer';
import { GraduateScriptsList } from '../components/Tabs/graduateScripts/GraduateScriptsList';
import { ViewerBox } from '../components/common/ViewerBox';

export const GraduateScriptsPage = (props) => {
  const takeDayViewerSx = React.useMemo(
    () => ({ width: '45%', marginLeft: '20px' }),
    []
  );

  const takeDayListSx = React.useMemo(
    () => ({ width: '30%', marginLeft: '20px' }),
    []
  );

  return (
    <ViewerBox left>
      <Box sx={takeDayViewerSx}>
        <GraduateScriptViewer />
      </Box>
      <Box sx={takeDayListSx}>
        <GraduateScriptsList />
      </Box>
    </ViewerBox>
  );
};

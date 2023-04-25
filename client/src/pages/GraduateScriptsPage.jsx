import { Box } from '@mui/system';
import React from 'react';
import { GraduateScriptViewer } from '../components/Tabs/graduateScripts/GraduateScriptViewer';
import { GraduateScriptsList } from '../components/Tabs/graduateScripts/GraduateScriptsList';
import { ViewerBox } from '../components/common/ViewerBox';
import { useCommonStore } from '../hooks/zustand/useCommonStore';
import { Navigate } from 'react-router-dom';

export const GraduateScriptsPage = React.memo(() => {
  const { startedGraduateScript } = useCommonStore((state) => state);

  const takeDayViewerSx = React.useMemo(
    () => ({ width: '45%', marginLeft: '20px' }),
    []
  );

  const takeDayListSx = React.useMemo(
    () => ({ width: '30%', marginLeft: '20px' }),
    []
  );

  if (startedGraduateScript) {
    return <Navigate to={'/graduate-process'} />;
  }

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
});

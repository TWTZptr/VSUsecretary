import { Box } from '@mui/system';
import React from 'react';
import { GraduateScriptViewer } from '../components/Tabs/graduateScripts/GraduateScriptViewer';
import { GraduateScriptsList } from '../components/Tabs/graduateScripts/GraduateScriptsList';
import { ViewerBox } from '../components/common/ViewerBox';
import { useCommonStore } from '../hooks/zustand/useCommonStore';
import { Navigate } from 'react-router-dom';
import { useGraduateScriptsStore } from '../hooks/zustand/useGraduateScriptsStore';

export const GraduateScriptsPage = React.memo(() => {
  const { startedGraduateScript } = useCommonStore((state) => state);
  const { getAllGraduateScripts } = useGraduateScriptsStore((state) => state);
  const { currentYear } = useCommonStore((state) => state);

  React.useEffect(() => {
    getAllGraduateScripts(currentYear);
  }, [currentYear, getAllGraduateScripts]);

  const graduateScriptViewerSx = React.useMemo(
    () => ({ width: '70%', marginLeft: '20px' }),
    []
  );

  const graduateScriptsListSx = React.useMemo(
    () => ({ width: '30%', marginLeft: '20px' }),
    []
  );

  if (startedGraduateScript) {
    return <Navigate to={'/graduate-process'} />;
  }

  return (
    <ViewerBox left>
      <Box sx={graduateScriptViewerSx}>
        <GraduateScriptViewer />
      </Box>
      <Box sx={graduateScriptsListSx}>
        <GraduateScriptsList />
      </Box>
    </ViewerBox>
  );
});

import { Box } from '@mui/system';
import React from 'react';
import { useCommonStore } from '../hooks/zustand/useCommonStore';
import { Navigate } from 'react-router-dom';

export const GraduateProcessPage = React.memo(() => {
  const { startedGraduateScript } = useCommonStore((state) => state);

  if (!startedGraduateScript) {
    return <Navigate to={'/graduate-scripts'} />;
  }

  return <Box></Box>;
});

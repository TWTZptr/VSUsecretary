import React from 'react';
import { useCommonStore } from '../hooks/zustand/useCommonStore';
import { Navigate } from 'react-router-dom';
import { GraduateProcess } from '../components/GraduateProcess/GraduateProcess';
import { useGraduateProcessStore } from '../hooks/zustand/useGraduateProcessStore';

export const GraduateProcessPage = React.memo(() => {
  const { startedGraduateScript } = useCommonStore((state) => state);
  const { loadGraduateProcess } = useGraduateProcessStore((state) => state);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (startedGraduateScript) {
      loadGraduateProcess(startedGraduateScript.id).then(() => setReady(true));
    }
  }, [loadGraduateProcess, startedGraduateScript]);

  if (!startedGraduateScript) {
    return <Navigate to={'/graduate-scripts'} />;
  }

  if (!ready) {
    return <></>;
  }

  return <GraduateProcess />;
});

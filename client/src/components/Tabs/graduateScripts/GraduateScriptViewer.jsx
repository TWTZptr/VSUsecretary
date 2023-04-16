import React from 'react';
import { ViewerBox } from '../../common/ViewerBox';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { GraduateScriptEditor } from './GraduateScriptEditor';

export const GraduateScriptViewer = () => {
  const { selectedGraduateScript, getAllEmployees } = useGraduateScriptsStore(
    (state) => state
  );

  React.useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  const disabled = !Boolean(selectedGraduateScript.id);

  return (
    <ViewerBox>
      <GraduateScriptEditor disabled={disabled} />
    </ViewerBox>
  );
};

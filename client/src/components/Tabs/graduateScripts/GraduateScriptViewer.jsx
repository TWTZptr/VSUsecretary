import React from 'react';
import { ViewerBox } from '../../common/ViewerBox';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import { GraduateScriptEditor } from './GraduateScriptEditor';

export const GraduateScriptViewer = () => {
  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);

  const disabled =
    !Boolean(selectedGraduateScript.id) || selectedGraduateScript.complete;

  return (
    <ViewerBox>
      <GraduateScriptEditor disabled={disabled} />
    </ViewerBox>
  );
};

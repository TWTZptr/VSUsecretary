import { useGraduateScript } from '../../../hooks/useGraduateScript';
import React from 'react';
import { ViewerBox } from '../../common/ViewerBox';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';

export const GraduateScriptViewer = (props) => {
  const { selectedGraduateScript } = useGraduateScriptsStore((state) => state);

  const [graduateScript, graduateScriptHandlers] = useGraduateScript();

  React.useEffect(() => {
    graduateScriptHandlers.setTakeDay(selectedGraduateScript);
  }, [selectedGraduateScript]);

  const disabled = !Boolean(selectedGraduateScript.id);

  return (
    <ViewerBox>
      {/*<GraduateScriptEditor*/}
      {/*  handlers={graduateScriptHandlers}*/}
      {/*  disabled={disabled}*/}
      {/*  localGraduateScript={graduateScript}*/}
      {/*/>*/}
    </ViewerBox>
  );
};

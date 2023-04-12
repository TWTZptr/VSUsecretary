import { DefaultList } from '../../common/DefaultList';
import { GraduateScriptItem } from './GraduateScriptItem';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import React from 'react';

export const GraduateScriptsList = React.memo(() => {
  const { selectGraduateScript, selectedGraduateScript, graduateScripts } =
    useGraduateScriptsStore((state) => state);

  const onClick = React.useCallback(
    (graduateScript) => {
      selectGraduateScript(graduateScript);
    },
    [selectGraduateScript]
  );

  return (
    <DefaultList>
      {graduateScripts.map((graduateScript) => {
        return (
          <GraduateScriptItem
            graduateScript={graduateScript}
            key={graduateScript.id}
            selected={graduateScript.id === selectedGraduateScript.id}
            onClick={onClick}
          />
        );
      })}
    </DefaultList>
  );
});

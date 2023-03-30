import { DefaultList } from '../../common/DefaultList';
import { TakeDayListItem } from './TakeDayListItem';
import { useGraduateScriptsStore } from '../../../hooks/zustand/useGraduateScriptsStore';
import React from 'react';

export const GraduateScriptsList = React.memo(() => {
  const { selectGraduateScript, selectedGraduateScript, graduateScripts } =
    useGraduateScriptsStore((state) => state);

  const onClick = React.useCallback((graduateScript) => {
    selectGraduateScript(graduateScript);
  }, selectGraduateScript);

  return (
    <DefaultList>
      {graduateScripts.map((graduateScript) => {
        return (
          <TakeDayListItem
            takeDay={graduateScript}
            key={graduateScript.id}
            selected={graduateScript.id === selectedGraduateScript.id}
            onClick={onClick}
          />
        );
      })}
    </DefaultList>
  );
});

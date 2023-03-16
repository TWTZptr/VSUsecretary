import { DefaultList } from '../../common/DefaultList';
import React from 'react';
import { DegreeWorkListItem } from '../../common/degreeWork/DegreeWorkListItem';
import { useDegreeWorksStore } from '../../../hooks/zustand/useDegreeWorksStore';

export const DegreeWorksList = React.memo((props) => {
  const { degreeWorks, selectedDegreeWork, selectDegreeWork } =
    useDegreeWorksStore((state) => state);

  const onClick = React.useCallback(
    (degreeWork) => {
      selectDegreeWork(degreeWork);
    },
    [selectDegreeWork]
  );

  const items = degreeWorks.map((degreeWork) => {
    return (
      <DegreeWorkListItem
        degreeWork={degreeWork}
        key={degreeWork.id}
        selected={degreeWork.id === selectedDegreeWork.id}
        onClick={onClick}
      />
    );
  });

  return <DefaultList>{items}</DefaultList>;
});

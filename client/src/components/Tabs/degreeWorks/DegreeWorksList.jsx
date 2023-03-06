import { DefaultList } from '../../common/DefaultList';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDegreeWork } from '../../../redux/slices/uiSlice';
import { DegreeWorksListItem } from '../../common/degreeWork/DegreeWorksListItem';

export const DegreeWorksList = React.memo((props) => {
  const degreeWorks = useSelector((state) => state.degreeWorks);
  const selectedDegreeWork = useSelector(
    (state) => state.ui.selectedDegreeWork
  );
  const dispatch = useDispatch();

  const onClick = React.useCallback((degreeWork) => {
    dispatch(selectDegreeWork(degreeWork));
  }, []);

  const items = degreeWorks.map((degreeWork) => {
    return (
      <DegreeWorksListItem
        degreeWork={degreeWork}
        key={degreeWork.id}
        selected={degreeWork.id === selectedDegreeWork.id}
        onClick={onClick}
      />
    );
  });

  return <DefaultList>{items}</DefaultList>;
});

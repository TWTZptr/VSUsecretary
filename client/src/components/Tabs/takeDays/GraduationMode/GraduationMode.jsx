import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GRADUATION_INITIAL_STATE } from '../../../../constants';
import { GraduationProcess } from './GraduationProcess/GraduationProcess';
import { GraduationEnd } from './GraduationEnd/GraduationEnd';
import { getTakeDayEmployeesAction } from '../../../../redux/actions/GraduationActions';
import {
  addStudentsToGraduation,
  setGraduationDirection,
  setGraduationGroup,
} from '../../../../redux/slices/graduationSlice';

export const GraduationMode = React.memo((props) => {
  const [end, setEnd] = React.useState(false);
  const takeDay = useSelector((state) => state.ui.startedTakeDay);
  const students = useSelector((state) => state.students);
  const groups = useSelector((state) => state.groups);
  const directions = useSelector((state) => state.directions);

  const degreeWorks = useSelector((state) => state.degreeWorks).filter(
    (degreeWork) => degreeWork.takeDayId === props.takeDay.id
  );

  const allGraduations = React.useRef(new Map());

  React.useEffect(() => {
    degreeWorks.forEach((degreeWork) =>
      allGraduations.current.set(degreeWork.id, GRADUATION_INITIAL_STATE)
    );
  }, []);

  const onGraduationEnd = React.useCallback(() => {
    setEnd(true);
  }, []);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTakeDayEmployeesAction(takeDay.id));
    const takeDayStudents = degreeWorks.map((degreeWork) => {
      return students.find((student) => student.id === degreeWork.studentId);
    });
    dispatch(addStudentsToGraduation(takeDayStudents));

    const groupId = takeDayStudents[0].groupId;
    const group = groups.find((group) => group.id === groupId);
    const directionId = group.directionId;
    const direction = directions.find(
      (direction) => direction.id === directionId
    );

    dispatch(setGraduationDirection(direction));
    dispatch(setGraduationGroup(group));
  }, [dispatch]);

  return end ? (
    <GraduationEnd
      allGraduations={allGraduations.current}
      degreeWorks={degreeWorks}
      takeDay={props.takeDay}
    />
  ) : (
    <GraduationProcess
      onGraduationEnd={onGraduationEnd}
      allGraduations={allGraduations}
      takeDay={props.takeDay}
      degreeWorks={degreeWorks}
    />
  );
});

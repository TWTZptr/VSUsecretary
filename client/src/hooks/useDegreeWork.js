// noinspection JSCheckFunctionSignatures

import { INITIAL_DEGREE_WORK_STATE } from '../constants';
import React from 'react';

export const useDegreeWork = (initialState = INITIAL_DEGREE_WORK_STATE) => {
  const [degreeWork, setDegreeWork] = React.useState(initialState);

  const degreeWorkHandlers = React.useMemo(() => {
    return {
      setDegreeWork: (degreeWork) => {
        setDegreeWork(() => degreeWork);
      },
      setTheme: (theme) => {
        setDegreeWork((prevState) => ({ ...prevState, theme }));
      },
      setStudentId: (studentId) => {
        setDegreeWork((prevState) => ({ ...prevState, studentId }));
      },
      setPagesNumber: (pagesNumber) => {
        setDegreeWork((prevState) => ({ ...prevState, pagesNumber }));
      },
      setReviewerId: (reviewerId) => {
        setDegreeWork((prevState) => ({ ...prevState, reviewerId }));
      },
      setSupervisorId: (supervisorId) => {
        setDegreeWork((prevState) => ({ ...prevState, supervisorId }));
      },
      setOriginality: (originality) => {
        setDegreeWork((prevState) => ({ ...prevState, originality }));
      },
      setSupervisorMark: (supervisorMark) => {
        setDegreeWork((prevState) => ({ ...prevState, supervisorMark }));
      },
      setReviewerMark: (reviewerMark) => {
        setDegreeWork((prevState) => ({ ...prevState, reviewerMark }));
      },
      setImplementation: (implementation) => {
        setDegreeWork((prevState) => ({ ...prevState, implementation }));
      },
      setTakeDayId: (takeDayId) => {
        setDegreeWork((prevState) => ({ ...prevState, takeDayId }));
      },
    };
  }, []);

  return [degreeWork, degreeWorkHandlers];
};

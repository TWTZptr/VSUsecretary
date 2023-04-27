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
      setReviewer: (reviewer) => {
        setDegreeWork((prevState) => ({ ...prevState, reviewer }));
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
      setSummary: (summary) => {
        setDegreeWork((prevState) => ({ ...prevState, summary }));
      },
      setNotes: (notes) => {
        setDegreeWork((prevState) => ({ ...prevState, notes }));
      },
      setFirstQuestion: (firstQuestion) => {
        setDegreeWork((prevState) => ({ ...prevState, firstQuestion }));
      },
      setSecondQuestion: (secondQuestion) => {
        setDegreeWork((prevState) => ({ ...prevState, secondQuestion }));
      },
      setFirstQuestionAuthorId: (firstQuestionAuthorId) => {
        setDegreeWork((prevState) => ({ ...prevState, firstQuestionAuthorId }));
      },
      setSecondQuestionAuthorId: (secondQuestionAuthorId) => {
        setDegreeWork((prevState) => ({
          ...prevState,
          secondQuestionAuthorId,
        }));
      },
      setMark: (mark) => {
        setDegreeWork((prevState) => ({ ...prevState, mark }));
      },
    };
  }, []);

  return [degreeWork, degreeWorkHandlers];
};

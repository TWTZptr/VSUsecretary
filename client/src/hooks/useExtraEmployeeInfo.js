import React from 'react';
import { INITIAL_EXTRA_EMPLOYEE_INFO_STATE } from '../constants';

export const useExtraEmployeeInfo = (
  initialState = INITIAL_EXTRA_EMPLOYEE_INFO_STATE
) => {
  const [info, setInfo] = React.useState(initialState);

  const handlers = React.useMemo(
    () => ({
      setExtraEmployeeInfo: (info) => setInfo(info),
      setAcademicDegree: (academicDegree) =>
        setInfo((prev) => ({ ...prev, academicDegree })),
      setAcademicRank: (academicRank) =>
        setInfo((prev) => ({ ...prev, academicRank })),
      setPosition: (position) => setInfo((prev) => ({ ...prev, position })),
      setAnotherJob: (anotherJob) =>
        setInfo((prev) => ({ ...prev, anotherJob })),
    }),
    []
  );

  return [info, handlers];
};

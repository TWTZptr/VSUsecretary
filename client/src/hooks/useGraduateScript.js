import { INITIAL_GRADUATE_SCRIPT_STATE } from '../constants';
import React from 'react';

export const useGraduateScript = (
  initialState = INITIAL_GRADUATE_SCRIPT_STATE
) => {
  const [takeDay, setGraduateScript] = React.useState(
    INITIAL_GRADUATE_SCRIPT_STATE
  );

  const addEmployee = (id) => {
    setGraduateScript({ ...takeDay, employees: [...takeDay.employees, id] });
  };

  const deleteEmployee = (id) => {
    setGraduateScript({
      ...takeDay,
      employees: takeDay.employees.filter((employee) => employee.id !== id),
    });
  };

  const addDegreeWork = (id) => {
    setGraduateScript({
      ...takeDay,
      degreeWorks: [...takeDay.degreeWorks, id],
    });
  };

  const deleteDegreeWork = (id) => {
    setGraduateScript({
      ...takeDay,
      degreeWorks: takeDay.degreeWorks.filter(
        (degreeWork) => degreeWork.id !== id
      ),
    });
  };

  const setDate = (date) => {
    setGraduateScript({ ...takeDay, date });
  };

  return [
    takeDay,
    {
      setTakeDay: setGraduateScript,
      addEmployee,
      deleteEmployee,
      addDegreeWork,
      deleteDegreeWork,
      setDate,
    },
  ];
};

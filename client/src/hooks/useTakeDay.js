import { INITIAL_TAKE_DAY_STATE } from '../constants';
import React from 'react';

export const useTakeDay = (initialState = INITIAL_TAKE_DAY_STATE) => {
  const [takeDay, setTakeDay] = React.useState(INITIAL_TAKE_DAY_STATE);

  const addEmployee = (id) => {
    setTakeDay({ ...takeDay, employees: [...takeDay.employees, id] });
  };

  const deleteEmployee = (id) => {
    setTakeDay({
      ...takeDay,
      employees: takeDay.employees.filter((employee) => employee.id !== id),
    });
  };

  const addDegreeWork = (id) => {
    setTakeDay({ ...takeDay, degreeWorks: [...takeDay.degreeWorks, id] });
  };

  const deleteDegreeWork = (id) => {
    setTakeDay({
      ...takeDay,
      degreeWorks: takeDay.degreeWorks.filter(
        (degreeWork) => degreeWork.id !== id
      ),
    });
  };

  const setDate = (date) => {
    setTakeDay({ ...takeDay, date });
  };

  return [
    takeDay,
    {
      setTakeDay,
      addEmployee,
      deleteEmployee,
      addDegreeWork,
      deleteDegreeWork,
      setDate,
    },
  ];
};

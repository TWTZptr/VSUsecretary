import { INITIAL_GRADUATE_SCRIPT_STATE } from '../constants';
import React from 'react';

export const useGraduateScript = (
  initialState = INITIAL_GRADUATE_SCRIPT_STATE
) => {
  const [takeDay, setGraduateScript] = React.useState(
    INITIAL_GRADUATE_SCRIPT_STATE
  );

  const handlers = React.useMemo(
    () => ({
      addEmployee: (id) => {
        setGraduateScript((takeDay) => ({
          ...takeDay,
          employees: [...takeDay.employees, id],
        }));
      },
      deleteEmployee: (id) => {
        setGraduateScript((takeDay) => ({
          ...takeDay,
          employees: takeDay.employees.filter((employee) => employee.id !== id),
        }));
      },
      addDegreeWork: (id) => {
        setGraduateScript((takeDay) => ({
          ...takeDay,
          degreeWorks: [...takeDay.degreeWorks, id],
        }));
      },
      setDirectionId: (directionId) => {
        setGraduateScript((prevState) => ({ ...prevState, directionId }));
      },
    }),
    []
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

  const setDate = React.useCallback((date) => {
    setGraduateScript((takeDay) => ({ ...takeDay, date }));
  }, []);

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

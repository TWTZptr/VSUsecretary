// noinspection JSCheckFunctionSignatures

import { INITIAL_EMPLOYEE_STATE } from '../constants';
import React from 'react';

export const useEmployee = (initialState = INITIAL_EMPLOYEE_STATE) => {
  const [employee, setEmployee] = React.useState(initialState);

  const employeeHandlers = React.useMemo(
    () => ({
      setName: (name) => {
        setEmployee((prevState) => ({ ...prevState, name }));
      },
      setLastname: (lastname) => {
        setEmployee((prevState) => ({ ...prevState, lastname }));
      },
      setPatronymic: (patronymic) => {
        setEmployee((prevState) => ({ ...prevState, patronymic }));
      },
      setAcademicDegree: (academicDegree) => {
        setEmployee((prevState) => ({ ...prevState, academicDegree }));
      },
      setAcademicRank: (academicRank) => {
        setEmployee((prevState) => ({ ...prevState, academicRank }));
      },
      setPosition: (position) => {
        setEmployee((prevState) => ({ ...prevState, position }));
      },
      setAnotherJob: (anotherJob) => {
        setEmployee((prevState) => ({ ...prevState, anotherJob }));
      },
      setPhoneNumber: (phoneNumber) => {
        setEmployee((prevState) => ({ ...prevState, phoneNumber }));
      },
      setEmail: (email) => {
        setEmployee((prevState) => ({ ...prevState, email }));
      },
      setStatus: (status) => {
        setEmployee((prevState) => ({ ...prevState, status }));
      },
      setEmployee: (employee) => {
        setEmployee(() => employee);
      },
    }),
    []
  );

  return [employee, employeeHandlers];
};

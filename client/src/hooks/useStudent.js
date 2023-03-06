// noinspection JSCheckFunctionSignatures

import React from 'react';
import { INITIAL_STUDENT_STATE } from '../constants';

export const useStudent = (initialState = INITIAL_STUDENT_STATE) => {
  const [student, setStudent] = React.useState(initialState);

  const studentHandlers = React.useMemo(
    () => ({
      setName: (name) => {
        setStudent((prevState) => ({ ...prevState, name }));
      },
      setLastname: (lastname) => {
        setStudent((prevState) => ({ ...prevState, lastname }));
      },
      setPatronymic: (patronymic) => {
        setStudent((prevState) => ({ ...prevState, patronymic }));
      },
      setPublications: (publications) => {
        setStudent((prevState) => ({ ...prevState, publications }));
      },
      setGroupId: (groupId) => {
        setStudent((prevState) => ({ ...prevState, groupId }));
      },
      setStudent: (student) => {
        setStudent(() => student);
      },
    }),
    []
  );

  return [student, studentHandlers];
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastError } from '../../../../../utils/toastSender';
import { formatPerson } from '../../../../../helpers/formatters';
import { CommonButton } from '../../../../common/CommonButton';
import { doesObjectHaveEmptyFields } from '../../../../../utils/doesObjectHaveEmptyFields';
import { updateDegreeWork } from '../../../../../services/degreeWorksService';
import { updateDegreeWorkAction } from '../../../../../redux/actions/degreeWorksActions';

export const EndGraduationButton = React.memo((props) => {
  const degreeWorks = useSelector((state) => state.degreeWorks);
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const onGraduationEnd = React.useCallback(async () => {
    let errors = [];
    const degreeWorksToUpdate = [];

    props.allGraduations.current.forEach((graduationInfo, id) => {
      const hasEmptyField = doesObjectHaveEmptyFields(graduationInfo);
      console.log(graduationInfo);
      if (hasEmptyField) {
        errors.push({ id, value: graduationInfo });
      } else {
        degreeWorksToUpdate.push({ id, mark: graduationInfo.mark });
      }
    });

    if (errors.length) {
      errors = errors.map((err) => {
        const degreeWork = degreeWorks.find(
          (degreeWork) => degreeWork.id === err.id
        );
        const student = students.find(
          (student) => student.id === degreeWork.studentId
        );
        return { degreeWork, student };
      });

      errors.forEach((err) => {
        toastError(
          `Информация о работе ${formatPerson(
            err.student,
            'genitive'
          )} не заполнена до конца!`
        );
      });
      return;
    }

    const updates = degreeWorksToUpdate.map((degreeWorkInfo) => {
      return dispatch(updateDegreeWorkAction(degreeWorkInfo));
    });
    await Promise.all(updates);

    props.onClick();
  }, [dispatch, props.allGraduations]);

  return (
    <CommonButton onClick={onGraduationEnd}>Завершить защиту</CommonButton>
  );
});

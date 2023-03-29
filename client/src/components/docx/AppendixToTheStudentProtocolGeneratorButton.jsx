import { useSelector } from 'react-redux';
import { CommonButton } from '../common/CommonButton';
import { toast, ToastContainer } from 'react-toastify';
import { Box } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';
import { generateAppendixToTheProtocol } from '../../helpers/docx/generateAppendixToTheProtocol';
import { getEmployeesByTakeDayId } from '../../services/graduateScriptsService';
import { saveAs } from 'file-saver';
import React from 'react';

export const AppendixToTheStudentProtocolGeneratorButton = React.memo(
  (props) => {
    const degreeWork = useSelector((state) => state.ui.selectedDegreeWork);
    const takeDay = useSelector((state) => state.takeDays).find(
      (takeDay) => takeDay.id === degreeWork.takeDayId
    );
    const student = useSelector((state) => state.students).find(
      (student) => student.id === degreeWork.studentId
    );
    const supervisor = useSelector((state) => state.employees).find(
      (employee) => employee.id === degreeWork.supervisorId
    );

    const onClick = async () => {
      if (!degreeWork || !takeDay || !student || !supervisor) {
        toast.error('Не выбран день сдачи/научный руководитель/студент', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      } else {
        const takeDayEmployees = await getEmployeesByTakeDayId(takeDay.id);
        const chairman = takeDayEmployees.find(
          (employee) => employee.status === 'Председатель'
        );
        const secretary = takeDayEmployees.find(
          (employee) => employee.status === 'Секретарь'
        );

        if (!chairman || !secretary) {
          toast.error('Не выбран председатель/секретарь', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        } else {
          const doc = await generateAppendixToTheProtocol({
            degreeWork,
            takeDay,
            student,
            supervisor,
            secretary,
            chairman,
          });
          saveAs(doc, 'doc.docx');
        }
      }
    };

    return (
      <Box>
        <CommonButton onClick={onClick} disabled={props.disabled}>
          Приложение к протоколу
        </CommonButton>
      </Box>
    );
  }
);

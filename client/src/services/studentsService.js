import { sendRequest } from '../utils/sendRequest';

const createStudent = async (student) => {
  const response = await sendRequest('post', '/api/students', student);
  return response.data;
};

const updateStudent = async (student) => {
  const response = await sendRequest('patch', '/api/students', student);
  return response.data;
};

const deleteStudentById = (id) => sendRequest('delete', `/api/students/${id}`);

const getAllStudents = async (year) => {
  const response = await sendRequest('get', '/api/students', undefined, {
    params: { year },
  });

  return response.data;
};

const getStudentById = (id) => sendRequest('get', `/api/students/${id}`);

const getAllStudentsWithNoGraduateScript = async (year) => {
  const response = await sendRequest(
    'get',
    '/api/students/no-graduate-script',
    undefined,
    {
      params: { year },
    }
  );

  return response.data;
};

const swapStudentIndexes = async (student1, student2) => {
  [student1.index, student2.index] = [student2.index, student1.index];
  return [await updateStudent(student1), await updateStudent(student2)];
};

export {
  createStudent,
  updateStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  getAllStudentsWithNoGraduateScript,
  swapStudentIndexes,
};

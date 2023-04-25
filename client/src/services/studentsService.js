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

export {
  createStudent,
  updateStudent,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  getAllStudentsWithNoGraduateScript,
};

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

const getAllStudents = async () => {
  const response = await sendRequest('get', '/api/students');
  return response.data;
};

export { createStudent, updateStudent, deleteStudentById, getAllStudents };

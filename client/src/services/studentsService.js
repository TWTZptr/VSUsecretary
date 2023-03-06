import axios from 'axios';

const createStudent = async (student) => {
  const response = await axios.post('/api/students', student);
  return response.data;
};

const updateStudent = async (student) => {
  const response = await axios.patch('/api/students', student);
  return response.data;
};

const deleteStudentById = async (id) => {
  await axios.delete(`/api/students/${id}`);
};

const getAllStudents = async () => {
  const response = await axios.get('/api/students');
  return response.data;
};

export { createStudent, updateStudent, deleteStudentById, getAllStudents };

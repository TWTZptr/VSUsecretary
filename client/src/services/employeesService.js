import axios from 'axios';

const createEmployee = async (employee) => {
  const response = await axios.post('/api/employees', employee);
  return response.data;
};

const updateEmployee = async (employee) => {
  const response = await axios.patch('/api/employees', employee);
  return response.data;
};

const deleteEmployeeById = async (id) => {
  await axios.delete(`/api/employees/${id}`);
};

const getAllEmployees = async () => {
  const response = await axios.get(`/api/employees`);
  return response.data;
};

export { createEmployee, deleteEmployeeById, getAllEmployees, updateEmployee };

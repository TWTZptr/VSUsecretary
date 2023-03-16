import { sendRequest } from '../utils/sendRequest';

const createEmployee = async (employee) => {
  const response = await sendRequest('post', '/api/employees', employee);
  return response.data;
};

const updateEmployee = async (employee) => {
  const response = await sendRequest('patch', '/api/employees', employee);
  return response.data;
};

const deleteEmployeeById = (id) =>
  sendRequest('delete', `/api/employees/${id}`);

const getAllEmployees = async () => {
  const response = await sendRequest('get', `/api/employees`);
  return response.data;
};

export { createEmployee, deleteEmployeeById, getAllEmployees, updateEmployee };

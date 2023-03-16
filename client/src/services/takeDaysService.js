import { sendRequest } from '../utils/sendRequest';

const createTakeDay = async (takeDay) => {
  const response = await sendRequest('post', '/api/take-days', takeDay);
  return response.data;
};

const updateTakeDay = async (takeDay) => {
  const response = await sendRequest('patch', '/api/take-days', takeDay);
  return response.data;
};

const deleteTakeDayById = (id) => sendRequest('delete', `/api/take-days/${id}`);

const getAllTakeDays = async () => {
  const response = await sendRequest('get', '/api/take-days');
  return response.data;
};

const getEmployeesByTakeDayId = async (takeDayId) => {
  const response = await sendRequest(
    'get',
    `/api/take-days/${takeDayId}/employees`
  );
  return response.data;
};

const setTakeDayToEmployee = (takeDayId, employeeId) =>
  sendRequest('post', 'api/employees/takeDays', {
    takeDayId,
    employeeId,
  });

const removeEmployeeTakeDay = (takeDayId, employeeId) =>
  sendRequest('delete', `api/employees/${employeeId}/takeDays/${takeDayId}`);

const addDegreeWorkToTakeDay = (takeDayId, degreeWorkId) =>
  sendRequest('patch', `api/degree-works`, {
    takeDayId,
    id: degreeWorkId,
  });

export {
  createTakeDay,
  updateTakeDay,
  deleteTakeDayById,
  getAllTakeDays,
  getEmployeesByTakeDayId,
  setTakeDayToEmployee,
  removeEmployeeTakeDay,
  addDegreeWorkToTakeDay,
};

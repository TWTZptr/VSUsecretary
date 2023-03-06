import axios from 'axios';

const createTakeDay = async (takeDay) => {
  const response = await axios.post('/api/take-days', takeDay);
  return response.data;
};

const updateTakeDay = async (takeDay) => {
  const response = await axios.patch('/api/take-days', takeDay);
  return response.data;
};

const deleteTakeDayById = async (id) => {
  await axios.delete(`/api/take-days/${id}`);
};

const getAllTakeDays = async () => {
  const response = await axios.get('/api/take-days');
  return response.data;
};

const getEmployeesByTakeDayId = async (takeDayId) => {
  const response = await axios.get(`/api/take-days/${takeDayId}/employees`);
  return response.data;
};

const setTakeDayToEmployee = async (takeDayId, employeeId) => {
  const response = await axios.post('api/employees/takeDays', {
    takeDayId,
    employeeId,
  });
  return response;
};

const removeEmployeeTakeDay = async (takeDayId, employeeId) => {
  const response = await axios.delete(
    `api/employees/${employeeId}/takeDays/${takeDayId}`
  );
  return response;
};

const addDegreeWorkToTakeDay = async (takeDayId, degreeWorkId) => {
  const response = await axios.patch(`api/degree-works`, {
    takeDayId,
    id: degreeWorkId,
  });
  return response;
};

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

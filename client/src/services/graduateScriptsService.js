import { sendRequest } from '../utils/sendRequest';

const createGraduateScript = async (takeDay) => {
  const response = await sendRequest('post', '/api/graduate-scripts', takeDay);
  return response.data;
};

const updateGraduateScript = async (takeDay) => {
  const response = await sendRequest('patch', '/api/graduate-scripts', takeDay);
  return response.data;
};

const deleteGraduateScriptById = (id) =>
  sendRequest('delete', `/api/graduate-scripts/${id}`);

const getAllGraduateScripts = async () => {
  const response = await sendRequest('get', '/api/graduate-scripts');
  return response.data;
};

const getEmployeesByGraduateScriptId = async (takeDayId) => {
  const response = await sendRequest(
    'get',
    `/api/graduate-scripts/${takeDayId}/employees`
  );
  return response.data;
};

const setGraduateScriptToEmployee = (takeDayId, employeeId, role) =>
  sendRequest('post', 'api/employees/takeDays', {
    takeDayId,
    role,
    employeeId,
  });

const removeEmployeeGraduateScript = (takeDayId, employeeId) =>
  sendRequest('delete', `api/employees/${employeeId}/takeDays/${takeDayId}`);

const addDegreeWorkToGraduateScript = (takeDayId, degreeWorkId) =>
  sendRequest('patch', `api/degree-works`, {
    takeDayId,
    id: degreeWorkId,
  });

export {
  createGraduateScript,
  updateGraduateScript,
  deleteGraduateScriptById,
  getAllGraduateScripts,
  getEmployeesByGraduateScriptId,
  setGraduateScriptToEmployee,
  removeEmployeeGraduateScript,
  addDegreeWorkToGraduateScript,
};

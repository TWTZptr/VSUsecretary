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

const getEmployeesByGraduateScriptId = async (graduateScriptId) => {
  const response = await sendRequest(
    'get',
    `/api/graduate-scripts/${graduateScriptId}/employees`
  );
  return response.data;
};

const removeEmployeeGraduateScript = (takeDayId, employeeId) =>
  sendRequest('delete', `api/employees/${employeeId}/takeDays/${takeDayId}`);

const addDegreeWorkToGraduateScript = (takeDayId, degreeWorkId) =>
  sendRequest('patch', `api/degree-works`, {
    takeDayId,
    id: degreeWorkId,
  });

const setGraduateScriptSecretary = (graduateScriptId, secretaryId) =>
  sendRequest('post', `api/graduate-scripts/${graduateScriptId}/secretary`, {
    employeeId: secretaryId,
  });

const setGraduateScriptChairman = (graduateScriptId, chairmanId) =>
  sendRequest('post', `api/graduate-scripts/${graduateScriptId}/chairman`, {
    employeeId: chairmanId,
  });

const setGraduateScriptCommissionMember = (
  graduateScriptId,
  employeeId,
  index
) =>
  sendRequest(
    'post',
    `api/graduate-scripts/${graduateScriptId}/commission-member`,
    {
      index,
      employeeId,
    }
  );

export {
  createGraduateScript,
  updateGraduateScript,
  deleteGraduateScriptById,
  getAllGraduateScripts,
  getEmployeesByGraduateScriptId,
  removeEmployeeGraduateScript,
  addDegreeWorkToGraduateScript,
  setGraduateScriptSecretary,
  setGraduateScriptChairman,
  setGraduateScriptCommissionMember,
};

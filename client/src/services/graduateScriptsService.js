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

const getAllGraduateScripts = async (year) => {
  const response = await sendRequest(
    'get',
    '/api/graduate-scripts',
    undefined,
    { params: { year } }
  );
  return response.data;
};

const getEmployeesByGraduateScriptId = async (graduateScriptId) => {
  const response = await sendRequest(
    'get',
    `/api/graduate-scripts/${graduateScriptId}/employees`
  );
  return response.data;
};

const removeEmployeeGraduateScript = (graduateScriptId, employeeId) =>
  sendRequest(
    'delete',
    `api/employees/${employeeId}/graduateScripts/${graduateScriptId}`
  );

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

const saveExtraInfo = (extraInfo) =>
  sendRequest(
    'patch',
    `/api/graduate-scripts/${extraInfo.graduateScriptId}/employees/${extraInfo.employeeId}`,
    extraInfo
  );

const getExtraInfo = async (employeeId, graduateScriptId) => {
  const res = await sendRequest(
    'get',
    `/api/graduate-scripts/${graduateScriptId}/employees/${employeeId}`
  );

  if (res.ok) {
    return res.data;
  }
};

const getStudentsByGraduateScriptId = async (graduateScriptId) => {
  const res = await sendRequest(
    'get',
    `/api/graduate-scripts/${graduateScriptId}/students`
  );

  if (res.ok) {
    return res.data;
  }
};

export {
  createGraduateScript,
  updateGraduateScript,
  deleteGraduateScriptById,
  getExtraInfo,
  getAllGraduateScripts,
  getEmployeesByGraduateScriptId,
  removeEmployeeGraduateScript,
  setGraduateScriptSecretary,
  getStudentsByGraduateScriptId,
  setGraduateScriptChairman,
  setGraduateScriptCommissionMember,
  saveExtraInfo,
};

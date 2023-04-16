import { sendRequest } from '../utils/sendRequest';

const createDegreeWork = async (degreeWork) => {
  const response = await sendRequest('post', '/api/degree-works', degreeWork);
  return response.data;
};

const updateDegreeWork = async (degreeWork) => {
  const response = await sendRequest('patch', '/api/degree-works', degreeWork);
  return response.data;
};

const deleteDegreeWorkById = (id) =>
  sendRequest('delete', `/api/degree-works/${id}`);

const getAllDegreeWorks = async (year) => {
  const response = await sendRequest('get', `/api/degree-works`, undefined, {
    params: { year },
  });
  return response.data;
};

export {
  createDegreeWork,
  updateDegreeWork,
  deleteDegreeWorkById,
  getAllDegreeWorks,
};

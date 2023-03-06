import axios from 'axios';

const createDegreeWork = async (degreeWork) => {
  const response = await axios.post('/api/degree-works', degreeWork);
  return response.data;
};

const updateDegreeWork = async (degreeWork) => {
  const response = await axios.patch('/api/degree-works', degreeWork);
  return response.data;
};

const deleteDegreeWorkById = async (id) => {
  await axios.delete(`/api/degree-works/${id}`);
};

const getAllDegreeWorks = async () => {
  const response = await axios.get(`/api/degree-works`);
  return response.data;
};

export {
  createDegreeWork,
  updateDegreeWork,
  deleteDegreeWorkById,
  getAllDegreeWorks,
};

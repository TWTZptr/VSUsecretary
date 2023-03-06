import axios from 'axios';

const createDirection = async (direction) => {
  const response = await axios.post('/api/directions', direction);
  return response.data;
};

const updateDirection = async (direction) => {
  const response = await axios.patch('/api/directions', direction);
  return response.data;
};

const deleteDirectionById = async (id) => {
  await axios.delete(`/api/directions/${id}`);
};

const getAllDirections = async () => {
  const response = await axios.get(`/api/directions`);
  return response.data;
};

export {
  createDirection,
  updateDirection,
  deleteDirectionById,
  getAllDirections,
};

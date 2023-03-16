import { sendRequest } from '../utils/sendRequest';

const createDirection = async (direction) => {
  const response = await sendRequest('post', '/api/directions', direction);
  return response.data;
};

const updateDirection = async (direction) => {
  const response = await sendRequest('patch', '/api/directions', direction);
  return response.data;
};

const deleteDirectionById = (id) =>
  sendRequest('delete', `/api/directions/${id}`);
const getAllDirections = async () => {
  const response = await sendRequest('get', `/api/directions`);
  return response.data;
};

export {
  createDirection,
  updateDirection,
  deleteDirectionById,
  getAllDirections,
};

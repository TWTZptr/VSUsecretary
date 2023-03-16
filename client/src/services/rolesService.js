import { sendRequest } from '../utils/sendRequest';

export const getAllRoles = async () => {
  const res = await sendRequest('get', '/api/roles');
  return res.data;
};

import { sendRequest } from '../utils/sendRequest';

export const getAllMarks = async () => {
  const res = await sendRequest('get', '/api/marks');
  return res.data;
};

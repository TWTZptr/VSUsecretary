import { sendRequest } from '../utils/sendRequest';

export const getAllEducationLevels = async () => {
  const res = await sendRequest('GET', '/api/education-levels');
  return res.data;
};

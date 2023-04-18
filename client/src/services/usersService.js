import { sendRequest } from '../utils/sendRequest';

export const changePassword = ({ userId, password, adminPassword }) =>
  sendRequest('patch', `/api/users`, { userId, password, adminPassword });

import axios from 'axios';
import { BASE_URL } from './constants';
import { sendApiRequest, sendRequest } from '../utils/sendRequest';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const tryLogin = async ({ roleId, password }) => {
  const response = await sendRequest(
    'post',
    `/api/auth/login`,
    {
      roleId,
      password,
    },
    { withCredentials: true }
  );

  if (response.ok) {
    setAccessToken(response.data.accessToken);
  }

  return response;
};

export const tryRefresh = async () => {
  try {
    const response = await sendRequest('post', `/api/auth/refresh`, null, {
      withCredentials: true,
    });
    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const setAccessToken = (token) => {
  api.defaults.headers.common['Authorization'] = token;
  localStorage.setItem('access_token', token);
};

export const getAccessTokenFromStorage = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    setAccessToken(token);
    return true;
  }
  return false;
};

export const removeAccessTokenFromStorage = () => {
  localStorage.removeItem('access_token');
};

export const getSelf = async () => sendRequest('get', `/api/auth/me`);

export const tryLogout = async () =>
  sendRequest('post', '/api/auth/logout', null, {
    withCredentials: true,
  });

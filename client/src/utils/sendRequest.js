import axios from 'axios';
import { api, tryRefresh } from '../services/authService';

export const sendApiRequest = (type, url, data = {}, config = {}) => {
  switch (type.toLowerCase()) {
    case 'post':
      return api.post(url, data, config);
    case 'get':
      return api.get(url, config);
    case 'patch':
      return api.patch(url, data, config);
    case 'delete':
      return api.delete(url, config);
    default:
      return api.get(url, config);
  }
};

export const sendRequest = async (type, url, data = {}, config = {}) => {
  try {
    const response = await sendApiRequest(type, url, data, config);

    return { status: response.status, data: response.data, ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401 && (await tryRefresh())) {
        const response = await sendRequest(type, url, data, config);
        return { status: response.status, data: response.data, ok: true };
      }

      return {
        status: err.response?.status,
        msg: err.response?.data?.message,
        ok: false,
      };
    } else {
      throw err;
    }
  }
};

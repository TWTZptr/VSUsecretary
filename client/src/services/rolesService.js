import axios from 'axios';

export const getAllRoles = async () => {
  const res = await axios.get('/api/roles');
  return res.data;
};

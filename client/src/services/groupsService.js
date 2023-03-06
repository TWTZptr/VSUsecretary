import axios from 'axios';

const createGroup = async (group) => {
  const response = await axios.post('/api/groups', group);
  return response.data;
};

const updateGroup = async (group) => {
  const response = await axios.patch('/api/groups', group);
  return response.data;
};

const deleteGroupById = async (id) => {
  await axios.delete(`/api/groups/${id}`);
};

const getAllGroups = async () => {
  const response = await axios.get(`/api/groups`);
  return response.data;
};

export { getAllGroups, deleteGroupById, updateGroup, createGroup };

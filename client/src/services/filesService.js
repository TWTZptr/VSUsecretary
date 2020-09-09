import { sendRequest } from '../utils/sendRequest';

export const getAllFilesByYear = async (year) => {
  const res = await sendRequest('get', 'api/files', undefined, {
    params: {
      year,
    },
  });

  return res.data;
};

export const createFile = async (year, file, filename) => {
  const formData = new FormData();
  formData.append('year', year);
  formData.append('file', new Blob([file]), filename);
  return sendRequest('post', 'api/files', formData);
};

export const deleteFile = (fileId) =>
  sendRequest('delete', `/api/files/${fileId}`, undefined);

export const parseStudentsFromFile = async (fileId, directionId, year) =>
  sendRequest('post', `api/files/${fileId}/parse-students`, {
    directionId,
    year,
  });

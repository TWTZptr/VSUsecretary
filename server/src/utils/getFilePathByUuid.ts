import { FILES_FOLDER } from '../files/constants';

export const getFilePathByUuid = (uuid: string): string => {
  return `${FILES_FOLDER}/${uuid}`;
};

import { createFile } from '../services/filesService';
import { toastError } from './toastSender';

export const sendFiles = async (year, files) => {
  const promises = [];

  for (const file of files) {
    promises.push(
      new Promise((resolve, rej) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const res = await createFile(year, reader.result, file.name);
          if (!res.ok) {
            toastError(res.msg);
          }
          resolve();
        };
        reader.readAsArrayBuffer(file);
      })
    );
  }

  await Promise.all(promises);
};

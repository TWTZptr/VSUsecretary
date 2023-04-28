import { sendRequest } from '../utils/sendRequest';

export const generateProtocolDoc = (graduateScriptId) =>
  sendRequest(
    'get',
    `/api/docs/protocol`,
    {},
    { params: { graduateScriptId }, responseType: 'blob' }
  );

export const generateProtocolAppendixDoc = (studentId) =>
  sendRequest(
    'get',
    `/api/docs/protocol-appendix`,
    {},
    { params: { studentId }, responseType: 'blob' }
  );

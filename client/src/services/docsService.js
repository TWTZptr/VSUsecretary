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

export const generateMarksShortList = (graduateScriptId) =>
  sendRequest(
    'get',
    `/api/docs/marks-list-short`,
    {},
    { params: { graduateScriptId }, responseType: 'blob' }
  );

export const generateStudentListing = (year, directionId) =>
  sendRequest(
    'get',
    'api/docs/student-listing',
    {},
    { params: { year, directionId }, responseType: 'blob' }
  );

export const generateStudentsPassports = (graduateScriptId) =>
  sendRequest(
    'get',
    `api/docs/students-passports`,
    {},
    { params: { graduateScriptId }, responseType: 'blob' }
  );

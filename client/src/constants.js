export const AVAILABLE_ACADEMIC_RANKS = ['Доцент', 'Профессор'];
export const AVAILABLE_ACADEMIC_DEGREES = [
  'д. т. н.',
  'д. ф. - м.н.',
  'к. т. н.',
  'к. ф. - м. н.',
];
export const AVAILABLE_WORK_MARKS = ['2', '3', '4', '5'];
export const INITIAL_DIRECTION_STATE = {
  code: '',
  shortName: '',
  fullName: '',
  educationLevelId: '',
};
export const INITIAL_STUDENT_STATE = {
  name: '',
  lastname: '',
  patronymic: '',
  publications: null,
  directionId: '',
};
export const INITIAL_EMPLOYEE_STATE = {
  name: '',
  lastname: '',
  patronymic: '',
  phoneNumber: '',
  email: '',
};
export const INITIAL_GRADUATE_SCRIPT_STATE = {
  date: null,
  complete: false,
};
export const INITIAL_DEGREE_WORK_STATE = {
  theme: '',
  studentId: '',
  pagesNumber: '',
  originality: '',
  supervisorMark: null,
  implementation: false,
  reviewer: '',
  reviewerMark: null,
  summary: '',
  notes: '',
  firstQuestion: '',
  secondQuestion: '',
  firstQuestionAuthorId: null,
  secondQuestionAuthorId: null,
  mark: null,
};
export const USER_ROLES = {
  ADMIN: 'Администратор',
  SECRETARY: 'Секретарь',
  DEANERY: 'Деканат',
};
export const INIT_USER = {
  name: '',
  id: 0,
  role: {
    id: 0,
    name: '',
  },
};
export const INITIAL_COMMISSION_STATE = Array(5).fill(INITIAL_EMPLOYEE_STATE);
export const INITIAL_GRADUATE_SCRIPT_EMPLOYEES_STATE = {
  commission: INITIAL_COMMISSION_STATE,
  secretary: null,
  chairman: null,
};
export const INITIAL_EXTRA_EMPLOYEE_INFO_STATE = {
  employeeId: 0,
  graduateScriptId: 0,
  academicDegree: '',
  position: '',
  anotherJob: '',
  academicRank: '',
};

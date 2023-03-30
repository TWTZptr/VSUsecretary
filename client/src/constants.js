export const AVAILABLE_EDUCATION_LEVELS = ['Бакалавриат', 'Магистратура'];
export const AVAILABLE_ACADEMIC_RANKS = ['Доцент', 'Профессор'];
export const AVAILABLE_ACADEMIC_DEGREES = [
  'д. т. н.',
  'д. ф. - м.н.',
  'к. т. н.',
  'к. ф. - м. н.',
];
export const AVAILABLE_EMPLOYEE_STATUSES = [
  'Председатель',
  'Член комиссии',
  'Секретарь',
];
export const AVAILABLE_WORK_MARKS = ['2', '3', '4', '5'];
export const INITIAL_GROUP_STATE = {
  directionId: '',
  number: '',
  educationLevel: 'Бакалавриат',
};
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
  publications: '',
  groupId: '',
};
export const INITIAL_EMPLOYEE_STATE = {
  name: '',
  lastname: '',
  patronymic: '',
  academicDegree: '',
  academicRank: '',
  anotherJob: '',
  phoneNumber: '',
  email: '',
  status: '',
  position: '',
};
export const INITIAL_GRADUATE_SCRIPT_STATE = {
  date: null,
};
export const INITIAL_DEGREE_WORK_STATE = {
  theme: '',
  studentId: '',
  pagesNumber: '',
  originality: '',
  supervisorMark: null,
  implementation: false,
  reviewerMark: null,
};
export const GRADUATION_INITIAL_STATE = {
  first: '',
  firstAuthor: INITIAL_EMPLOYEE_STATE,
  second: '',
  secondAuthor: INITIAL_EMPLOYEE_STATE,
  overview: '',
  remarks: '',
  mark: '',
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

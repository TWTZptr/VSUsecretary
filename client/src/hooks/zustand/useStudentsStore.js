import { createDefaultStore } from '../../helpers/createDefaultStore';
import { INITIAL_STUDENT_STATE } from '../../constants';
import {
  createStudent,
  deleteStudentById,
  getAllStudents,
  updateStudent,
} from '../../services/studentsService';

export const useStudentsStore = createDefaultStore(
  'student',
  {
    update: updateStudent,
    getAll: getAllStudents,
    create: createStudent,
    remove: deleteStudentById,
  },
  INITIAL_STUDENT_STATE
);

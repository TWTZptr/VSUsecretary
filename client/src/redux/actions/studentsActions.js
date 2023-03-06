import { createAsyncThunk } from '@reduxjs/toolkit';
import { INITIAL_STUDENT_STATE } from '../../constants';
import {
  createStudent,
  deleteStudentById,
  getAllStudents,
  updateStudent,
} from '../../services/studentsService';
import { selectStudent } from '../slices/uiSlice';

export const getAllStudentsAction = createAsyncThunk(
  'students/getAll',
  async (_, thunkAPI) => {
    const students = await getAllStudents();
    return students;
  }
);

export const updateStudentAction = createAsyncThunk(
  'students/update',
  async (studentToUpdate, thunkAPI) => {
    const student = await updateStudent(studentToUpdate);
    thunkAPI.dispatch(selectStudent(student));
    return student;
  }
);

export const deleteStudentAction = createAsyncThunk(
  'students/delete',
  async (studentId, thunkAPI) => {
    await deleteStudentById(studentId);
    thunkAPI.dispatch(selectStudent(INITIAL_STUDENT_STATE));
  }
);

export const createStudentAction = createAsyncThunk(
  'students/create',
  async (studentToCreate, thunkAPI) => {
    const student = await createStudent(studentToCreate);
    return student;
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDegreeWork,
  deleteDegreeWorkById,
  getAllDegreeWorks,
  updateDegreeWork,
} from '../../services/degreeWorksService';
import { selectDegreeWork } from '../slices/uiSlice';
import { INITIAL_DEGREE_WORK_STATE } from '../../constants';

export const getAllDegreeWorksAction = createAsyncThunk(
  'degreeWorks/getAll',
  async (_, thunkAPI) => {
    const degreeWorks = await getAllDegreeWorks();
    return degreeWorks;
  }
);

export const updateDegreeWorkAction = createAsyncThunk(
  'degreeWorks/update',
  async (degreeWorkToUpdate, thunkAPI) => {
    const degreeWork = await updateDegreeWork(degreeWorkToUpdate);
    thunkAPI.dispatch(selectDegreeWork(degreeWork));
    return degreeWork;
  }
);

export const deleteDegreeWorkAction = createAsyncThunk(
  'degreeWorks/delete',
  async (degreeWorkId, thunkAPI) => {
    await deleteDegreeWorkById(degreeWorkId);
    thunkAPI.dispatch(selectDegreeWork(INITIAL_DEGREE_WORK_STATE));
    return degreeWorkId;
  }
);

export const createDegreeWorkAction = createAsyncThunk(
  'degreeWorks/create',
  async (degreeWorkToCreate, thunkAPI) => {
    const degreeWork = await createDegreeWork(degreeWorkToCreate);
    return degreeWork;
  }
);

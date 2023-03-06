import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTakeDay,
  deleteTakeDayById,
  getAllTakeDays,
  updateTakeDay,
} from '../../services/takeDaysService';
import { INITIAL_TAKE_DAY_STATE } from '../../constants';
import { selectTakeDay } from './uiActions';

export const getAllTakeDaysAction = createAsyncThunk(
  'takeDays/getAll',
  async (_, thunkAPI) => {
    const takeDays = await getAllTakeDays();
    return takeDays;
  }
);

export const updateTakeDayAction = createAsyncThunk(
  'takeDays/update',
  async (takeDayToUpdate, thunkAPI) => {
    const takeDay = await updateTakeDay(takeDayToUpdate);
    thunkAPI.dispatch(selectTakeDay(takeDay));
    return takeDay;
  }
);

export const deleteTakeDayAction = createAsyncThunk(
  'takeDays/delete',
  async (takeDayId, thunkAPI) => {
    await deleteTakeDayById(takeDayId);
    thunkAPI.dispatch(selectTakeDay(INITIAL_TAKE_DAY_STATE));
  }
);

export const createTakeDayAction = createAsyncThunk(
  'takeDays/create',
  async (takeDayToCreate, thunkAPI) => {
    const takeDay = await createTakeDay(takeDayToCreate);
    thunkAPI.dispatch(selectTakeDay(takeDay));
    return takeDay;
  }
);

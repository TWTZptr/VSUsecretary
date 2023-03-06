import { createAsyncThunk } from '@reduxjs/toolkit';
import { INITIAL_DIRECTION_STATE } from '../../constants';
import {
  createDirection,
  deleteDirectionById,
  getAllDirections,
  updateDirection,
} from '../../services/directionsService';
import { selectDirection } from '../slices/uiSlice';

export const getAllDirectionsAction = createAsyncThunk(
  'directions/getAll',
  async (_, thunkAPI) => {
    const directions = await getAllDirections();
    return directions;
  }
);

export const updateDirectionAction = createAsyncThunk(
  'directions/update',
  async (directionToUpdate, thunkAPI) => {
    const direction = await updateDirection(directionToUpdate);
    thunkAPI.dispatch(selectDirection(direction));
    return direction;
  }
);

export const deleteDirectionAction = createAsyncThunk(
  'directions/delete',
  async (directionId, thunkAPI) => {
    await deleteDirectionById(directionId);
    thunkAPI.dispatch(selectDirection(INITIAL_DIRECTION_STATE));
    return directionId;
  }
);

export const createDirectionAction = createAsyncThunk(
  'directions/create',
  async (directionToCreate, thunkAPI) => {
    const direction = await createDirection(directionToCreate);
    return direction;
  }
);

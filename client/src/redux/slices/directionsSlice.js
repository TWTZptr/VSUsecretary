import { createSlice } from '@reduxjs/toolkit';
import {
  createDirectionAction,
  deleteDirectionAction,
  getAllDirectionsAction,
  updateDirectionAction,
} from '../actions/directionsActions';

const directionsSlice = createSlice({
  name: 'directions',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDirectionsAction.fulfilled, (state, { payload }) => {
        state.push(...payload);
      })
      .addCase(updateDirectionAction.fulfilled, (state, { payload }) => {
        const indexOfChangedDirection = state.findIndex(
          (direction) => direction.id === payload.id
        );
        state[indexOfChangedDirection] = payload;
      })
      .addCase(deleteDirectionAction.fulfilled, (state, { payload }) => {
        const indexToDelete = state.findIndex(
          (direction) => direction.id === payload
        );
        state.splice(indexToDelete, 1);
      })
      .addCase(createDirectionAction.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const directionsReducer = directionsSlice.reducer;

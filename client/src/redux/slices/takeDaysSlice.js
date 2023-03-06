import { createSlice } from '@reduxjs/toolkit';
import {
  createTakeDayAction,
  deleteTakeDayAction,
  getAllTakeDaysAction,
  updateTakeDayAction,
} from '../actions/takeDaysActions';

const takeDaysSlice = createSlice({
  name: 'takeDays',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTakeDaysAction.fulfilled, (state, { payload }) => {
        state.push(...payload);
      })
      .addCase(updateTakeDayAction.fulfilled, (state, { payload }) => {
        const indexOfChangedTakeDay = state.findIndex(
          (takeDay) => takeDay.id === payload.id
        );
        state[indexOfChangedTakeDay] = payload;
      })
      .addCase(deleteTakeDayAction.fulfilled, (state, { payload }) => {
        const indexToDelete = state.findIndex(
          (takeDay) => takeDay.id === payload
        );
        state.splice(indexToDelete, 1);
      })
      .addCase(createTakeDayAction.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const takeDaysReducer = takeDaysSlice.reducer;

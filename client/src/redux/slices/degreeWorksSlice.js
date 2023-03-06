import { createSlice } from '@reduxjs/toolkit';
import {
  createDegreeWorkAction,
  deleteDegreeWorkAction,
  getAllDegreeWorksAction,
  updateDegreeWorkAction,
} from '../actions/degreeWorksActions';

const degreeWorksSlice = createSlice({
  name: 'degreeWorks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDegreeWorksAction.fulfilled, (state, { payload }) => {
        state.push(...payload);
      })
      .addCase(updateDegreeWorkAction.fulfilled, (state, { payload }) => {
        const indexOfChangedDegreeWork = state.findIndex(
          (degreeWork) => degreeWork.id === payload.id
        );
        state[indexOfChangedDegreeWork] = payload;
      })
      .addCase(deleteDegreeWorkAction.fulfilled, (state, { payload }) => {
        const indexToDelete = state.findIndex(
          (degreeWork) => degreeWork.id === payload
        );
        state.splice(indexToDelete, 1);
      })
      .addCase(createDegreeWorkAction.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const degreeWorksReducer = degreeWorksSlice.reducer;

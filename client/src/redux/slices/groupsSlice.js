import {
  createGroupAction,
  deleteGroupAction,
  getAllGroupsAction,
  updateGroupAction,
} from '../actions/groupsActions';
import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupsAction.fulfilled, (state, { payload }) => {
        state.push(...payload);
      })
      .addCase(updateGroupAction.fulfilled, (state, { payload }) => {
        const indexOfChangedGroup = state.findIndex(
          (group) => group.id === payload.id
        );
        state[indexOfChangedGroup] = payload;
      })
      .addCase(deleteGroupAction.fulfilled, (state, { payload }) => {
        const indexToDelete = state.findIndex((group) => group.id === payload);
        state.splice(indexToDelete, 1);
      })
      .addCase(createGroupAction.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const groupsReducer = groupsSlice.reducer;

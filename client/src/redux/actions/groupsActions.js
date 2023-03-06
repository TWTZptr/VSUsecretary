import { createAsyncThunk } from '@reduxjs/toolkit';
import { INITIAL_GROUP_STATE } from '../../constants';
import {
  createGroup,
  deleteGroupById,
  getAllGroups,
  updateGroup,
} from '../../services/groupsService';
import { selectGroup } from '../slices/uiSlice';

export const getAllGroupsAction = createAsyncThunk(
  'groups/getAll',
  async (_, thunkAPI) => {
    const groups = await getAllGroups();
    return groups;
  }
);

export const updateGroupAction = createAsyncThunk(
  'groups/update',
  async (groupToUpdate, thunkAPI) => {
    const group = await updateGroup(groupToUpdate);
    thunkAPI.dispatch(selectGroup(group));
    return group;
  }
);

export const deleteGroupAction = createAsyncThunk(
  'groups/delete',
  async (groupId, thunkAPI) => {
    await deleteGroupById(groupId);
    thunkAPI.dispatch(selectGroup(INITIAL_GROUP_STATE));
    return groupId;
  }
);

export const createGroupAction = createAsyncThunk(
  'groups/create',
  async (groupToCreate, thunkAPI) => {
    const group = await createGroup(groupToCreate);
    return group;
  }
);

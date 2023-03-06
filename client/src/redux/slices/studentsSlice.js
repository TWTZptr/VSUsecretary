const { createSlice } = require('@reduxjs/toolkit');
const {
  getAllStudentsAction,
  updateStudentAction,
  deleteStudentAction,
  createStudentAction,
} = require('../actions/studentsActions');

const studentsSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudentsAction.fulfilled, (state, { payload }) => {
        state.push(...payload);
      })
      .addCase(updateStudentAction.fulfilled, (state, { payload }) => {
        const indexOfChangedStudent = state.findIndex(
          (student) => student.id === payload.id
        );
        state[indexOfChangedStudent] = payload;
      })
      .addCase(deleteStudentAction.fulfilled, (state, { payload }) => {
        const indexToDelete = state.findIndex((group) => group.id === payload);
        state.splice(indexToDelete, 1);
      })
      .addCase(createStudentAction.fulfilled, (state, { payload }) => {
        state.push(payload);
      });
  },
});

export const studentsReducer = studentsSlice.reducer;

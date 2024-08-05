import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, register } from '../auth/operations.js';
import type from './types.js';

const slice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.type = type.success;
        state.message = `You have successfully logged in as ${action.payload.user.name}`;
      })
      .addCase(register.rejected, (state, action) => {
        state.type = type.error;
        state.message = 'Failed to register user';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.type = type.success;
        state.message = `You have successfully logged in as ${action.payload.user.name}`;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.type = type.error;
        state.message = 'Error during authorization';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.type = type.success;
        state.message = 'You have successfully de-authorized';
      })
      .addCase(logOut.rejected, (state) => {
        state.type = type.error;
        state.message = 'You have successfully de-authorized';
      })
      .addCase(refreshUser.rejected, (state) => {
        state.type = type.error;
        state.message = 'Error during refresh. You have been de-authorized';
      }),
});

export default slice.reducer;
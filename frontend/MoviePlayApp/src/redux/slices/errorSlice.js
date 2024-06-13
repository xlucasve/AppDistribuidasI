import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action) => {
      state.error = action.payload;
    },
    hideError: (state) => {
      state.error = null;
    },
  },
});

export const { showError, hideError } = errorSlice.actions;

export default errorSlice.reducer;

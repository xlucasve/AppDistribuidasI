import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/apiConfig'; 

export const retryRequest = createAsyncThunk(
  'retry/retryRequest',
  async (config, { rejectWithValue }) => {
    try {
      const response = await api.request(config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


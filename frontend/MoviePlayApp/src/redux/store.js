import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import errorReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    error: errorReducer,
  },
});

export default store;

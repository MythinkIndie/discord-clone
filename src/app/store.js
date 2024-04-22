import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import appSlice from '../features/user/appSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice
  },
});

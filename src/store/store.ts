import { configureStore } from '@reduxjs/toolkit';
import userDataFormReducer from './slices/userDataFormSlice';

export const store = configureStore({
  reducer: {
    user: userDataFormReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

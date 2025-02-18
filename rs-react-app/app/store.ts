import { configureStore } from '@reduxjs/toolkit';
import checkReducer from '../features/check';

export const store = configureStore({
  reducer: {
    checks: checkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

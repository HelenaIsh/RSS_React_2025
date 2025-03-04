import { configureStore } from '@reduxjs/toolkit';
import checkReducer from '../features/check';
import resultsReducer from '../features/results';

export const store = configureStore({
  reducer: {
    checks: checkReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

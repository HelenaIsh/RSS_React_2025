import { configureStore } from '@reduxjs/toolkit';
import checkReducer from '../features/check';

export const store = configureStore({
  reducer: {
    check: checkReducer,
  },
});

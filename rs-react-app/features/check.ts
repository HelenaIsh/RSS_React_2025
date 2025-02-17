import { createSlice, PayloadAction, Store } from '@reduxjs/toolkit';

interface CheckPayload {
  id: string;
  checked: boolean;
}

const initialState: string[] = [];

const checkSlice = createSlice({
  name: 'checks',
  initialState,
  reducers: {
    addCheck: (state, action: PayloadAction<CheckPayload>) => {
      const { id, checked } = action.payload;
      if (checked) {
        state.push(id);
      } else {
        return state.filter((check) => check !== id);
      }
    },
  },
});

export const selectAllChecks = (state: { check: string[] }) => state.check;

export const { addCheck } = checkSlice.actions;

export default checkSlice.reducer;

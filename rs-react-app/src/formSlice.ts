import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  email: string;
}

interface FormState {
  uncontrolledData: FormData | null;
  hookFormData: FormData | null;
}

const initialState: FormState = {
  uncontrolledData: null,
  hookFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledData = action.payload;
    },
    setHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledData, setHookFormData } = formSlice.actions;
export default formSlice.reducer;

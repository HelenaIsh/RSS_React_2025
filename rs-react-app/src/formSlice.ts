import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptTnC?: boolean;
  picture?: string | null;
  country?: string;
  countries?: string[];
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTnC: false,
  picture: null,
  country: '',
  countries: ['USA', 'Canada', 'Germany', 'Russia', 'Australia', 'Brazil'],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledData(state, action: PayloadAction<FormState>) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.gender = action.payload.gender;
      state.acceptTnC = action.payload.acceptTnC;
      state.picture = action.payload.picture;
      state.country = action.payload.country;
    },
    setPicture(state, action: PayloadAction<string | null>) {
      state.picture = action.payload;
    },
  },
});

export const { setUncontrolledData, setPicture } = formSlice.actions;

export default formSlice.reducer;

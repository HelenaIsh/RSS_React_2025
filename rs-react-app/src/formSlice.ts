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

interface FormSliceState {
  oldState: FormState;
  newState: FormState;
}

const initialState: FormSliceState = {
  oldState: {
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
  },
  newState: {
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
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledData(state, action: PayloadAction<FormState>) {
      state.oldState = JSON.parse(JSON.stringify(state.newState));
      state.newState.name = action.payload.name;
      state.newState.age = action.payload.age;
      state.newState.email = action.payload.email;
      state.newState.password = action.payload.password;
      state.newState.confirmPassword = action.payload.confirmPassword;
      state.newState.gender = action.payload.gender;
      state.newState.acceptTnC = action.payload.acceptTnC;
      state.newState.picture = action.payload.picture;
      state.newState.country = action.payload.country;
    },
  },
});

export const { setUncontrolledData } = formSlice.actions;

export default formSlice.reducer;

import * as Yup from 'yup';

export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Enter your name'),
  age: Yup.number()
    .positive('Age cannot be negative')
    .integer('Age must be an integer')
    .required('Enter your age'),
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm your password'),
  gender: Yup.string().required('Select gender'),
  acceptTnC: Yup.bool()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required(),
    picture: Yup.mixed<FileList>()
    .test('fileRequired', 'Upload a picture', (value) => {
      return value && value.length > 0;
    })
    .required('Upload a picture'),
  country: Yup.string().required('Select a country'),
});

export type FormData = Yup.InferType<typeof validationSchema>;
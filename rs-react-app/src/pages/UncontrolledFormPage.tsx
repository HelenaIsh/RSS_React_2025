import { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { setUncontrolledData, FormState } from '../formSlice';
import { RootState } from '../store';
import './form.css';

const validationSchema = Yup.object({
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
  picture: Yup.mixed().required('Upload a picture'),
  country: Yup.string().required('Select a country'),
});

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

export const UncontrolledFormPage: FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.form.oldState.countries
  );
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTnCRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<FormState>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form as HTMLFormElement);
    const file = formData.get('picture') as File;

    let base64 = null;
    if (file && file.type.startsWith('image/')) {
      base64 = await toBase64(file);
    }

    const values = {
      name: nameRef.current?.value,
      age: ageRef.current ? parseInt(ageRef.current.value) : 0,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      acceptTnC: acceptTnCRef.current?.checked,
      picture: base64,
      country: countryRef.current?.value,
    };

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      dispatch(setUncontrolledData(values));
      navigate('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError && Array.isArray(err.inner)) {
        const formErrors = err.inner.reduce<Record<string, string>>(
          (acc, curr) => {
            if (curr.path) {
              acc[curr.path] = curr.message;
            }
            return acc;
          },
          {}
        );

        setErrors(formErrors);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    let strength = 0;
    if (value.match(/[A-Z]/)) {
      strength += 1;
    }
    if (value.match(/[a-z]/)) {
      strength += 1;
    }
    if (value.match(/\d/)) {
      strength += 1;
    }
    if (value.match(/[\W_]/)) {
      strength += 1;
    }
    setPasswordStrength(strength);
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/form-uncontrolled">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/form-hook-form">Hook Form</Link>
          </li>
        </ul>
      </nav>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" name="name" />
          <p className="error">{errors.name}</p>
        </div>

        <div className="form-input">
          <label htmlFor="age">Age</label>
          <input ref={ageRef} type="number" id="age" name="age" />
          <p className="error">{errors.age}</p>
        </div>

        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" name="email" />
          <p className="error">{errors.email}</p>
        </div>

        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            className={`password-strength-${passwordStrength.toString()}`}
          />
          <p className="error">{errors.password}</p>
        </div>

        <div className="form-input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <p className="error">{errors.confirmPassword}</p>
        </div>

        <div className="form-input">
          <label htmlFor="gender">Gender</label>
          <select ref={genderRef} id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="error">{errors.gender}</p>
        </div>

        <div className="form-input">
          <div className="one-line-form-input">
            <label htmlFor="acceptTnC">Agree to T&C</label>
            <input
              ref={acceptTnCRef}
              type="checkbox"
              id="acceptTnC"
              name="acceptTnC"
            />
          </div>

          <p className="error">{errors.acceptTnC}</p>
        </div>

        <div className="form-input">
          <label htmlFor="picture">Upload a picture</label>
          <input
            ref={pictureRef}
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
          />
          <p className="error">{errors.picture}</p>
        </div>

        <div className="form-input">
          <label htmlFor="country">Country</label>
          <select ref={countryRef} id="country" name="country">
            {countries?.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p className="error">{errors.country}</p>
        </div>

        <div className="form-input">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

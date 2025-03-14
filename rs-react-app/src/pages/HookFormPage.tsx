import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledData } from '../formSlice';
import { RootState } from '../store';
import './form.css';
import { FormData, toBase64, validationSchema } from '../utils';
import { Header } from '../components/Header';

export const HookFormPage: FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.form.oldState.countries
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');

  const onSubmit = async (data: FormData) => {
    try {
      const file = data.picture[0];
      let base64 = null;
      if (file && file.type.startsWith('image/')) {
        base64 = await toBase64(file);
      }

      const values = {
        ...data,
        picture: base64,
      };

      await validationSchema.validate(values, { abortEarly: false });
      dispatch(setUncontrolledData(values));
      navigate('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError && Array.isArray(err.inner)) {
        err.inner.forEach((e) => {
          if (e.path) {
            setError(e.path as keyof FormData, {
              type: 'manual',
              message: e.message,
            });
          }
        });
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    let strength = 0;
    if (value.match(/[A-Z]/)) strength += 1;
    if (value.match(/[a-z]/)) strength += 1;
    if (value.match(/\d/)) strength += 1;
    if (value.match(/[\W_]/)) strength += 1;
    return strength;
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input
            {...register('name')}
            type="text"
            id="name"
            autoComplete="name"
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="age">Age</label>
          <input
            {...register('age', { valueAsNumber: true })}
            type="number"
            id="age"
            autoComplete="age"
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            autoComplete="email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className={`password-strength-${handlePasswordChange(password).toString()}`}
            autoComplete="new-password"
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
          />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="gender">Gender</label>
          <select {...register('gender')} id="gender" autoComplete="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="error">{errors.gender?.message}</p>
        </div>

        <div className="form-input">
          <div className="one-line-form-input">
            <label htmlFor="acceptTnC">Agree to T&C</label>
            <input {...register('acceptTnC')} type="checkbox" id="acceptTnC" />
          </div>
          <p className="error">{errors.acceptTnC?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="picture">Upload a picture</label>
          <input
            {...register('picture')}
            type="file"
            id="picture"
            accept="image/png, image/jpeg"
          />
          <p className="error">{errors.picture?.message}</p>
        </div>

        <div className="form-input">
          <label htmlFor="country">Country</label>
          <select {...register('country')} id="country" autoComplete="country">
            {countries?.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p className="error">{errors.country?.message}</p>
        </div>

        <div className="form-input">
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

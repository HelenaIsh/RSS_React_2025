import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from './Spinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChecks } from '../../features/check';
import { AppDispatch, RootState } from '../../app/store';
import { fetchData } from '../../features/results';

export const SearchForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.results);
  const [name, setName] = useLocalStorage('search', 'animal');
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const [, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '0';

  useEffect(() => {
    dispatch(fetchData({ name, page })).unwrap();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({});
    dispatch(deleteChecks());
    dispatch(fetchData({ name, page: '0' })).unwrap();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="search-form"
        data-testid={'form'}
      >
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          data-testid={'search-input'}
          className={theme === 'light' ? 'lightInput' : 'darkInput'}
          placeholder={`enter animal's name or just letter a`}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <Spinner />}
    </>
  );
};

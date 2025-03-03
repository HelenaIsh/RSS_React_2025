import React, { FC, useEffect, useState } from 'react';
import { Spinner } from './Spinner';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '../app/store';
import { fetchData } from '../features/results';
import { deleteChecks } from '../features/check';
import { useLocalStorage } from '../src/hooks/useLocalStorage';

export const SearchForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.results);
  const [name, setName] = useLocalStorage('search', 'animal');
  const router = useRouter();
  const { theme } = useTheme();
  const page = (router.query.page as string) || '0';

  useEffect(() => {
    dispatch(fetchData({ name, page: page })).unwrap();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

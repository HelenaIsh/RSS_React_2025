import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from './Spinner';
import { fetchResults } from '../services/fetchApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { deleteChecks } from '../../features/check';

interface SearchFormProps {
  setResults: (results: unknown) => void;
  setTotalPages: (totalPages: string) => void;
}

export const SearchForm: FC<SearchFormProps> = ({
  setResults,
  setTotalPages,
}) => {
  const [name, setName] = useLocalStorage('search', 'animal');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const fetchData = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const page = searchParams.get('page') || '0';
      const data = await fetchResults(query, page);
      setResults(data['animals'] || []);
      setTotalPages(data.page.totalPages);
    } catch (err: unknown) {
      setResults(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      fetchData(name);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({});
    dispatch(deleteChecks());
    fetchData(name);
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

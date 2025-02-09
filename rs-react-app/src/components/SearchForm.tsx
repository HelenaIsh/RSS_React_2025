import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from './Spinner';
import { fetchResults } from '../services/fetchApi';
import { useLocalStorage } from '../hooks/useLocalStorage';

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

  const fetchData = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const page = searchParams.get('page') || '1';
      let data = await fetchResults(query, page);
      const totalPages = data.page.totalPages;
      if (+page > +totalPages) {
        data = await fetchResults(query, totalPages);
      }
      setResults(data[`${query}s`] || []);
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
          list="search"
          data-testid={'search-input'}
        />
        <datalist id="search">
          <option value="animal" />
          <option value="astronomicalObject" />
          <option value="book" />
          <option value="character" />
        </datalist>
        <button type="submit">Search</button>
      </form>
      {loading && <Spinner />}
    </>
  );
};

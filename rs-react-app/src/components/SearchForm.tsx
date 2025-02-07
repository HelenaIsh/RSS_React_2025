import React, { FC, useEffect, useState, useCallback } from 'react';
import { Spinner } from './Spinner';
import { fetchResults } from '../services/fetchApi';

interface SearchFormProps {
  setResults: (results: unknown) => void;
}

export const SearchForm: FC<SearchFormProps> = ({ setResults }) => {
  const [name, setName] = useState(localStorage.getItem('search') || 'animal');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await fetchResults(query);
      setResults(data[`${query}s`] || []);
    } catch (err: unknown) {
      setResults(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [setResults]);

  useEffect(() => {
    if (name) {
      fetchData(name);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    localStorage.setItem('search', name);
    fetchData(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

    return (
      <>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            list="search"
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
}

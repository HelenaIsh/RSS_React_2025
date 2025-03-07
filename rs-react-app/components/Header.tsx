import React, { FC } from 'react';
import { SearchForm } from './SearchForm';
import { useTheme } from '../context/ThemeContext';

export const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header>
      <SearchForm />
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </header>
  );
};

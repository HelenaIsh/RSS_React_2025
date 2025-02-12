import { FC } from 'react';
import { SearchForm } from './SearchForm';
import { useTheme } from '../context/ThemeContext';

export interface HeaderProps {
  setResults: (results: unknown) => void;
  setTotalPages: (totalPages: string) => void;
}

export const Header: FC<HeaderProps> = (props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <SearchForm {...props} />
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </header>
  );
};

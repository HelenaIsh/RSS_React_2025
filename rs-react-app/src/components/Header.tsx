import { FC } from 'react';
import { SearchForm } from './SearchForm';

interface HeaderProps {
  setResults: (results: unknown) => void;
  setTotalPages: (totalPages: number) => void;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <header>
      <SearchForm {...props} />
    </header>
  );
};

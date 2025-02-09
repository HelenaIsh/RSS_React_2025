import { FC } from 'react';
import { SearchForm } from './SearchForm';

export interface HeaderProps {
  setResults: (results: unknown) => void;
  setTotalPages: (totalPages: string) => void;
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <header>
      <SearchForm {...props} />
    </header>
  );
};

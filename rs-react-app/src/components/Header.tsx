import { FC } from 'react';
import { SearchForm } from './SearchForm';

interface HeaderProps {
  setResults: (results: unknown) => void;
}

export const Header: FC<HeaderProps> = ({ setResults }) => {
    return (
      <header>
        <SearchForm setResults={setResults} />
      </header>
    );
}

import { FC, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Header } from '../components/Header';
import { ErrorButton } from '../components/ErrorButton';
import { Main } from '../components/Main';

export const MainPage: FC = () => {
  const [results, setResults] = useState<unknown>(undefined);
  const [totalPages, setTotalPages] = useState<string>('1');
  return (
    <ErrorBoundary
      fallback={<h2>Something went wrong. Please try again later.</h2>}
    >
      <Header setResults={setResults} setTotalPages={setTotalPages} />
      <Main results={results} totalPages={totalPages} />
      <ErrorButton />
    </ErrorBoundary>
  );
};

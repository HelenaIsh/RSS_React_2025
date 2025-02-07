import { FC, useState } from 'react';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorButton } from './components/ErrorButton';
import { Header } from './components/Header';
import { Main } from './components/Main';
const App: FC = () => {
  const [results, setResults] = useState<unknown>(undefined);
  const [totalPages, setTotalPages] = useState<number>(1);
  return (
    <div className="app">
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <Header
          setResults={(results) => setResults(results)}
          setTotalPages={(totalPages) => setTotalPages(totalPages)}
        />
        <Main results={results} totalPages={totalPages} />
        <ErrorButton />
      </ErrorBoundary>
    </div>
  );
};
export default App;

import { FC } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Header } from '../components/Header';
import { ErrorButton } from '../components/ErrorButton';
import { Main } from '../components/Main';

export const MainPage: FC = () => {
  return (
    <ErrorBoundary
      fallback={<h2>Something went wrong. Please try again later.</h2>}
    >
      <Header />
      <Main />
      <ErrorButton />
    </ErrorBoundary>
  );
};

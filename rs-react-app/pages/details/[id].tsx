import React, { FC } from 'react';

import { useTheme } from '../../context/ThemeContext';
import '../../styles/App.css';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { ErrorButton } from '../../components/ErrorButton';

const App: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={'app ' + (theme === 'light' ? 'light' : 'dark')}>
      <ErrorBoundary
        fallback={<h2>Something went wrong. Please try again later.</h2>}
      >
        <Header />
        <Main />
        <ErrorButton />
      </ErrorBoundary>
    </div>
  );
};
export default App;

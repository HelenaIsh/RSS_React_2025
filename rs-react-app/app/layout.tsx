'use client';

import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/index.css';
import '../styles/app.css';
import { ReactNode } from 'react';

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={'app ' + (theme === 'light' ? 'light' : 'dark')}>
      {children}
    </div>
  );
};

function MyApp({ children }: { children: ReactNode }) {
  return (

    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <AppContent >{children}</AppContent>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

export default MyApp;

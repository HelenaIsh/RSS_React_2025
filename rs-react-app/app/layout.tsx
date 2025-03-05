'use client';

import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/index.css';
import '../styles/app.css';
import { ReactNode } from 'react';

function MyApp({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

export default MyApp;

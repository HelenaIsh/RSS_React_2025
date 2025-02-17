import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from '../app/store.ts'

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
      </Provider>
    </StrictMode>
  );

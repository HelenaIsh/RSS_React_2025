import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { MainPage } from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import { DetailedCard } from './components/DetailedCard';
import { useTheme } from './context/ThemeContext';

const App: FC = () => {
  const { theme } = useTheme();
  return (
    <div className={'app ' + (theme === 'light' ? 'light' : 'dark')}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:id" element={<DetailedCard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
export default App;

import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { MainPage } from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import { DetailedCard } from './components/DetailedCard';

const App: FC = () => {
  return (
    <div className="app">
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

import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { MainPage } from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
export default App;

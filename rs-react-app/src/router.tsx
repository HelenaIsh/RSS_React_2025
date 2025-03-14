import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { UncontrolledFormPage } from './pages/UncontrolledFormPage';
import { HookFormPage } from './pages/HookFormPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/form-uncontrolled', element: <UncontrolledFormPage /> },
  { path: '/form-hook-form', element: <HookFormPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <Link to="/">Go Back to Main Page</Link>
  </div>
);

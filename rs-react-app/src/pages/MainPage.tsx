import { FC } from 'react';
import { Link } from 'react-router-dom';

export const MainPage: FC = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/form-uncontrolled">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/form-hook-form">Hook Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

export const Header: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Main
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/form-uncontrolled"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Uncontrolled Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/form-hook-form"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Hook Form
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

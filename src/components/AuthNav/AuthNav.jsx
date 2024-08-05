import css from './AuthNav.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export default function AuthNav() {
  function buildLinkClass({ isActive }) {
    return clsx(css['link'], isActive && css['active']);
  }

  return (
    <>
      <nav>
        <NavLink className={buildLinkClass} to="/register">
          Register
        </NavLink>
        <NavLink className={buildLinkClass} to="/login">
          Log In
        </NavLink>
      </nav>
    </>
  );
};
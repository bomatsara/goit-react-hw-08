import css from './Nav.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

export default function Nav() {
  function buildLinkClass({ isActive }) {
    return clsx(css['link'], isActive && css['active']);
  }

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <nav>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink className={buildLinkClass} to="/contacts">
            Contacts
          </NavLink>
        )}
      </nav>
    </>
  );
};
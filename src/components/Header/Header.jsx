import css from './Header.module.css';
import clsx from 'clsx';
import Nav from '../Nav/Nav.jsx';
import AuthNav from '../AuthNav/AuthNav.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import UserMenu from '../UserMenu/UserMenu.jsx';

export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css['header']}>
      <div className={css['header-wrap']}>
        <div className={css['header-logo']}>CL</div>
        <div className={clsx(css['header-nav'], css['header-nav-common'])}><Nav /></div>
        <div className={clsx(css['header-nav'], css['header-nav-auth'])}>
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </header>
  );
};
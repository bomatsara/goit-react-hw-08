import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';
import { logOut } from '../../redux/auth/operations';
import { IoLogOutOutline } from 'react-icons/io5';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css['wrapper']}>
      <div className={css['username']}>Welcome, <strong>{user.name}</strong></div>
      <button title="Logout" type="button" className={css['btn']} onClick={() => dispatch(logOut())}>
        <IoLogOutOutline className={css['icon']} size={30} />
      </button>
    </div>
  );
}

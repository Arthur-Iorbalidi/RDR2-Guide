import routes from '@src/constants/routes';
import useAppDispatch from '@src/hooks/useAppDispatch';
import useClickOutside from '@src/hooks/useClickOutside';
import serverAPI from '@src/services/serverAPI';
import {
  changeIsAuthorized,
  changeUserInfo,
} from '@src/store/slices/userSlice';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthUserMenu.module.scss';

interface IProps {
  toggleAuthUserMenu: () => void;
  isAuthUserMenuOpened: boolean;
}

const AuthUserMenu = ({ toggleAuthUserMenu, isAuthUserMenuOpened }: IProps) => {
  const dispatch = useAppDispatch();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    toggleAuthUserMenu();
  }, [toggleAuthUserMenu]);

  useClickOutside(menuRef, handleClickOutside);

  const logout = () => {
    toggleAuthUserMenu();
    serverAPI.logout();
    dispatch(changeIsAuthorized(false));
    dispatch(changeUserInfo(undefined));
  };

  return (
    <>
      {isAuthUserMenuOpened && (
        <nav className={styles.burger_menu} ref={menuRef}>
          <ul className={styles.burger_menu_list}>
            <li>
              <Link
                to={routes.account}
                className={styles.link}
                onClick={toggleAuthUserMenu}
              >
                <span className={styles.link_text}>Account</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.favorites}
                className={styles.link}
                onClick={toggleAuthUserMenu}
              >
                <span className={styles.link_text}>Favorites</span>
              </Link>
            </li>
            <li>
              <button className={styles.link} onClick={logout}>
                <span className={styles.link_text}>Log out</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default AuthUserMenu;

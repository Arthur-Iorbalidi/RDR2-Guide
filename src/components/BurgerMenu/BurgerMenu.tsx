import routes from '@src/constants/routes';
import useAppDispatch from '@src/hooks/useAppDispatch';
import useAppSelector from '@src/hooks/useAppSelector';
import useClickOutside from '@src/hooks/useClickOutside';
import serverAPI from '@src/services/serverAPI';
import {
  changeIsAuthorized,
  changeUserInfo,
} from '@src/store/slices/userSlice';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './BurgerMenu.module.scss';

interface IProps {
  toggleBurgerMenu: () => void;
  isBurgerMenuOpened: boolean;
}

const BurgerMenu = ({ toggleBurgerMenu, isBurgerMenuOpened }: IProps) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    toggleBurgerMenu();
  }, [toggleBurgerMenu]);

  useClickOutside(menuRef, handleClickOutside);

  const logout = () => {
    toggleBurgerMenu();
    serverAPI.logout();
    dispatch(changeIsAuthorized(false));
    dispatch(changeUserInfo(undefined));
  };

  return (
    <>
      <div
        className={`${styles.burger_menu} ${isBurgerMenuOpened ? styles.opened : ''}`}
        ref={menuRef}
      >
        <nav className={styles.nav}>
          <ul className={styles.burger_menu_list}>
            <li>
              <Link
                to={routes.locations}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Locations</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.weapons}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Weapons</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.horses}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Horses</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.storyQuests}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Story Quests</span>
              </Link>
            </li>
            <li>
              <Link
                to={routes.sideQuests}
                className={styles.link}
                onClick={toggleBurgerMenu}
              >
                <span className={styles.link_text}>Side Quests</span>
              </Link>
            </li>
            <div className={styles.line}></div>
            {isAuth ? (
              <>
                <li>
                  <Link
                    to={routes.account}
                    className={styles.link}
                    onClick={toggleBurgerMenu}
                  >
                    <span className={styles.link_text}>Account</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.favorites}
                    className={styles.link}
                    onClick={toggleBurgerMenu}
                  >
                    <span className={styles.link_text}>Favorites</span>
                  </Link>
                </li>
                <li>
                  <button className={styles.link} onClick={logout}>
                    <span className={styles.link_text}>Log out</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={routes.login}
                    className={styles.link}
                    onClick={toggleBurgerMenu}
                  >
                    <span className={styles.link_text}>Log In</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenu;

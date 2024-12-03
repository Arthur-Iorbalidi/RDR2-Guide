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
  closeBurgerMenu: () => void;
  isBurgerMenuOpened: boolean;
}

const BurgerMenu = ({ closeBurgerMenu, isBurgerMenuOpened }: IProps) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => {
    closeBurgerMenu();
  }, [closeBurgerMenu]);

  useClickOutside(menuRef, handleClickOutside);

  const logout = () => {
    closeBurgerMenu();
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
        <div className={styles.container}>
          <nav className={styles.nav}>
            <ul className={styles.burger_menu_list}>
              <li>
                <Link
                  to={routes.weapons}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Weapons</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.horses}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Horses</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.storyQuests}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Story Quests</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.sideQuests}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Side Quests</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.animals}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Animals</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.plants}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Plants</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.fishes}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Fishes</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.challenges}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Challenges</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.collectibles}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Collectibles</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.factions}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Factions</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.miscellaneous}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Miscellaneous</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.randomEncounters}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Random encounters</span>
                </Link>
              </li>
              <li>
                <Link
                  to={routes.tableGames}
                  className={styles.link}
                  onClick={closeBurgerMenu}
                >
                  <span className={styles.link_text}>Table games</span>
                </Link>
              </li>
              <div className={styles.line}></div>
              {isAuth ? (
                <>
                  <li>
                    <Link
                      to={routes.account}
                      className={styles.link}
                      onClick={closeBurgerMenu}
                    >
                      <span className={styles.link_text}>Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={routes.saved}
                      className={styles.link}
                      onClick={closeBurgerMenu}
                    >
                      <span className={styles.link_text}>Saved</span>
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
                      onClick={closeBurgerMenu}
                    >
                      <span className={styles.link_text}>Log In</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;

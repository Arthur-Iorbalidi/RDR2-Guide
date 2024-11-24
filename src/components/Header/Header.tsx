import { appName } from '@src/constants/applicationInfo';
import breakpoints from '@src/constants/breakpoints';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import useWindowWidth from '@src/hooks/useWindowWidth';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthUserMenu from '../AuthUserMenu/AuthUserMenu';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerMenuButton from '../ui/BurgerMenuButton/BurgerMenuButton';
import Button from '../ui/Button/Button';
import styles from './Header.module.scss';

const Header = () => {
  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  const currentWindowWidth = useWindowWidth();

  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  const [isAuthUserMenuOpened, setIsAuthUserMenuOpened] = useState(false);

  useEffect(() => {
    if (currentWindowWidth >= breakpoints.burgerMenuAppearance) {
      setIsBurgerMenuOpened(false);
    } else {
      setIsAuthUserMenuOpened(false);
    }
  }, [currentWindowWidth]);

  const handleToggleBurgerMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    toggleBurgerMenu();
  };

  const toggleBurgerMenu = useCallback(() => {
    setIsBurgerMenuOpened((prev) => !prev);
  }, []);

  const closeBurgerMenu = useCallback(() => {
    setIsBurgerMenuOpened(false);
  }, []);

  const handleToggleAuthUserMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    toggleAuthUserMenu();
  };

  const toggleAuthUserMenu = useCallback(() => {
    setIsAuthUserMenuOpened((prev) => !prev);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.appName_wrapper}>
          <h2 className={styles.appName}>{appName}</h2>
        </div>
        <div className={styles.btns}>
          {currentWindowWidth >= breakpoints.burgerMenuAppearance && (
            <>
              <div className={styles.auth}>
                {isAuth === false ? (
                  <>
                    <Link className={styles.btn} to={routes.login}>
                      <Button value="Log In" />
                    </Link>
                  </>
                ) : isAuth === true ? (
                  <button
                    onClick={handleToggleAuthUserMenu}
                    className={styles.account_btn}
                  >
                    <img
                      className={styles.account_logo}
                      src={images.accountLogo}
                      alt="Account"
                    />
                  </button>
                ) : null}
                <AuthUserMenu
                  toggleAuthUserMenu={toggleAuthUserMenu}
                  isAuthUserMenuOpened={isAuthUserMenuOpened}
                />
              </div>
            </>
          )}
          <BurgerMenuButton
            isBurgerMenuOpened={isBurgerMenuOpened}
            handleOpenBurgerMenu={handleToggleBurgerMenu}
          />
          <BurgerMenu
            closeBurgerMenu={closeBurgerMenu}
            isBurgerMenuOpened={isBurgerMenuOpened}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

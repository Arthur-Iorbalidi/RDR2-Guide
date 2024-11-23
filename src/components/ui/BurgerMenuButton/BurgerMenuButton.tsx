import styles from './BurgerMenuButton.module.scss';

interface IProps {
  isBurgerMenuOpened: boolean;
  handleOpenBurgerMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const BurgerMenuButton = ({
  isBurgerMenuOpened,
  handleOpenBurgerMenu,
}: IProps) => {
  return (
    <button
      className={`${styles.burger_btn} ${isBurgerMenuOpened ? styles.active : ''}`}
      onClick={handleOpenBurgerMenu}
    >
      <div className={styles.burger_line}></div>
      <div className={styles.burger_line}></div>
    </button>
  );
};

export default BurgerMenuButton;

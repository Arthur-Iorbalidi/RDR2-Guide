import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import images from '@src/constants/images';
import { Link } from 'react-router-dom';

import styles from './item.module.scss';

export enum Appearance {
  vertical,
  horizontal,
}

interface IProps {
  id: number;
  title: string;
  subtitle?: string;
  caption?: string;
  image?: string;
  isActive: boolean;
  navigateTo: string;
  appearance?: Appearance;
  handleBtnClickCallback?: (id: number) => void;
}

const Item = ({
  id,
  title,
  subtitle,
  caption,
  image,
  isActive,
  navigateTo,
  handleBtnClickCallback,
  appearance = Appearance.vertical,
}: IProps) => {
  const handleBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    handleBtnClickCallback?.(id);
  };

  const classNameSwitcher = () => {
    switch (appearance) {
      case Appearance.horizontal:
        return styles.horizontal;
      case Appearance.vertical:
        return styles.vertical;
      default:
        return styles.vertical;
    }
  };

  return (
    <Link to={navigateTo} className={`${styles.item} ${classNameSwitcher()}`}>
      {image && (
        <div className={styles.img_wrapper}>
          <img
            src={image}
            alt="item"
            className={styles.item_img}
            onError={(e) => {
              e.currentTarget.src = images.imgPlaceholder;
            }}
          />
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.details}>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {caption && <p className={styles.subtitle}>{caption}</p>}
        </div>
        <div className={styles.favorite_btn_wrapper}>
          <FavoriteButton isInFavorites={isActive} onClick={handleBtnClick} />
        </div>
      </div>
    </Link>
  );
};

export default Item;

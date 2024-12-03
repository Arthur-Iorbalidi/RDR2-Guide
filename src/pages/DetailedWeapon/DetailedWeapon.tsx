import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addWeaponToSaved,
  removeWeaponFromSaved,
} from '@src/store/slices/userSlice';
import { IWeapon } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedWeapon } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedWeapon.module.scss';

const DetailedWeapon = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedWeapons = useAppSelector(
    (state) => state.userReducer.userInfo?.weapons,
  );

  const [weapon, setWeapon] = useState<IWeapon | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getWeapon(Number(id), errorCallback);
      setWeapon(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addWeaponToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeWeaponFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const errorCallback = (message: string) => {
    setError(message);
  };

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    toggleSavedWeapon(
      weapon!.id,
      isInArray(weapon!.id, savedWeapons),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className={styles.detailed_page}>
      {isLoading && <Loader />}
      {weapon && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.img}
                src={imageAPI.getImage(weapon.image!)}
                alt="weapon"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(weapon.id, savedWeapons)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{weapon.name}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Damage:</span>
                  <span className={styles.overview_item_value}>
                    {weapon.damage}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Range:</span>
                  <span className={styles.overview_item_value}>
                    {weapon.range}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Firing rate:
                  </span>
                  <span className={styles.overview_item_value}>
                    {weapon.firingRate}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Accuracy:</span>
                  <span className={styles.overview_item_value}>
                    {weapon.accuracy}
                  </span>
                </p>
                {weapon.cost && (
                  <p className={styles.overview_item}>
                    <span className={styles.overview_item_title}>Cost:</span>
                    <span className={styles.overview_item_value}>
                      {`$${weapon.cost}`}
                    </span>
                  </p>
                )}
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Is unique:</span>
                  <span className={styles.overview_item_value}>
                    {`${weapon.isUnique}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {weapon.location && (
            <div className={styles.location_wrapper}>
              <h2 className={styles.location_title}>Location</h2>
              <div className={styles.location_content}>
                <h3 className={styles.location_name}>{weapon.location.name}</h3>
                <div className={styles.img_wrapper}>
                  <img
                    className={styles.img}
                    src={imageAPI.getImage(weapon.location.image)}
                    alt="location"
                    onError={(e) => {
                      e.currentTarget.src = images.imgPlaceholder;
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <Message message={error} />}
    </section>
  );
};

export default DetailedWeapon;

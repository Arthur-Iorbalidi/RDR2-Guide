import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addHorseToSaved,
  removeHorseFromSaved,
} from '@src/store/slices/userSlice';
import { IHorse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedHorse } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedHorse.module.scss';

const DetailedHorse = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedHorses = useAppSelector(
    (state) => state.userReducer.userInfo?.horses,
  );

  const [horse, setHorse] = useState<IHorse | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getHorse(Number(id), errorCallback);
      setHorse(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addHorseToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeHorseFromSaved(id));
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

    toggleSavedHorse(
      horse!.id,
      isInArray(horse!.id, savedHorses),
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
      {horse && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.img}
                src={imageAPI.getImage(horse.image!)}
                alt="horse"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(horse.id, savedHorses)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{horse.breed}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Health:</span>
                  <span className={styles.overview_item_value}>
                    {horse.health}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Stamina:</span>
                  <span className={styles.overview_item_value}>
                    {horse.stamina}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Speed:</span>
                  <span className={styles.overview_item_value}>
                    {horse.speed}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Acceleration:
                  </span>
                  <span className={styles.overview_item_value}>
                    {horse.acceleration}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Handling:</span>
                  <span className={styles.overview_item_value}>
                    {horse.handling}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {horse.location && (
            <div className={styles.location_wrapper}>
              <h2 className={styles.location_title}>Location</h2>
              <div className={styles.location_content}>
                <h3 className={styles.location_name}>{horse.location.name}</h3>
                <div className={styles.img_wrapper}>
                  <img
                    className={styles.img}
                    src={imageAPI.getImage(horse.location.image)}
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

export default DetailedHorse;

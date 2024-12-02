import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addFishToSaved,
  removeFishFromSaved,
} from '@src/store/slices/userSlice';
import { IFish } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedFish } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedFish.module.scss';

const DetailedFish = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedFishes = useAppSelector(
    (state) => state.userReducer.userInfo?.fishes,
  );

  const [fish, setFish] = useState<IFish | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFish(Number(id), errorCallback);
      setFish(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addFishToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeFishFromSaved(id));
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

    toggleSavedFish(
      fish!.id,
      isInArray(fish!.id, savedFishes),
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
      {fish && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.info}>
            <div className={styles.main_info}>
              <h2 className={styles.title}>{fish.name}</h2>
            </div>
            <div className={styles.favourite_btn_wrapper}>
              <FavoriteButton
                isInFavorites={isInArray(fish.id, savedFishes)}
                onClick={handleToggleFavorite}
              />
            </div>
            <div className={styles.overview}>
              <h2 className={styles.overview_title}>Overview</h2>
              <p className={styles.overview_item}>
                <span className={styles.overview_item_title}>Bait:</span>
                <span className={styles.overview_item_value}>{fish.bait}</span>
              </p>
              <p className={styles.overview_item}>
                <span className={styles.overview_item_title}>
                  Is legendary:
                </span>
                <span className={styles.overview_item_value}>
                  {`${fish.isLegendary}`}
                </span>
              </p>
            </div>
          </div>
          {fish.location && (
            <div className={styles.location_wrapper}>
              <h2 className={styles.location_title}>Location</h2>
              <div className={styles.location_content}>
                <h3 className={styles.location_name}>{fish.location.name}</h3>
                <div className={styles.img_wrapper}>
                  <img
                    className={styles.img}
                    src={imageAPI.getImage(fish.location.image)}
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

export default DetailedFish;

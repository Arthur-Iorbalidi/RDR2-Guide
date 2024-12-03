import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addCollectibleToSaved,
  removeCollectibleFromSaved,
} from '@src/store/slices/userSlice';
import { ICollectible } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedCollectible } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedCollectible.module.scss';

const DetailedCollectible = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedCollectibles = useAppSelector(
    (state) => state.userReducer.userInfo?.collectibles,
  );

  const [collectible, setCollectible] = useState<ICollectible | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getCollectible(Number(id), errorCallback);
      setCollectible(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addCollectibleToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeCollectibleFromSaved(id));
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

    toggleSavedCollectible(
      collectible!.id,
      isInArray(collectible!.id, savedCollectibles),
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
      {collectible && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.img}
                src={imageAPI.getImage(collectible.image!)}
                alt="collectible"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(collectible.id, savedCollectibles)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{collectible.name}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Amount:</span>
                  <span className={styles.overview_item_value}>
                    {collectible.amount}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Side Quest:
                  </span>
                  <Link
                    className={styles.overview_item_value_link}
                    to={`${routes.sideQuests}/${collectible.sidequest.id}`}
                  >
                    {collectible.sidequest.name}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <Message message={error} />}
    </section>
  );
};

export default DetailedCollectible;

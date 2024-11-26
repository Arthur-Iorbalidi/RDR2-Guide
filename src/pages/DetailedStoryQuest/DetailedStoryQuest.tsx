import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addStoryQuestToSaved,
  removeStoryQuestFromSaved,
} from '@src/store/slices/userSlice';
import { IStoryQuest } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedStoryQuest } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedStoryQuest.module.scss';

const DetailedStoryQuest = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedStoryQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.storyQuests,
  );

  const [storyQuest, setStoryQuest] = useState<IStoryQuest | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getStoryQuest(Number(id), errorCallback);
      setStoryQuest(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addStoryQuestToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeStoryQuestFromSaved(id));
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

    toggleSavedStoryQuest(
      storyQuest!.id,
      isInArray(storyQuest!.id, savedStoryQuests),
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
      {storyQuest && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.img}
                src={imageAPI.getImage(storyQuest.image!)}
                alt="story quest"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(storyQuest.id, savedStoryQuests)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{storyQuest.name}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Number:</span>
                  <span className={styles.overview_item_value}>
                    {storyQuest.number}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Rewards:</span>
                  <span className={styles.overview_item_value}>
                    {storyQuest.reward}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {storyQuest.location && (
            <div className={styles.location_wrapper}>
              <h2 className={styles.location_title}>Location</h2>
              <div className={styles.img_wrapper}>
                <img
                  className={styles.img}
                  src={imageAPI.getImage(storyQuest.location.image)}
                  alt="location"
                  onError={(e) => {
                    e.currentTarget.src = images.imgPlaceholder;
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {error && <Message message={error} />}
    </section>
  );
};

export default DetailedStoryQuest;

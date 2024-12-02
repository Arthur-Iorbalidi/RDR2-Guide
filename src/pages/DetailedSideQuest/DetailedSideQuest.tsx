import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addSideQuestToSaved,
  removeSideQuestFromSaved,
} from '@src/store/slices/userSlice';
import { ISideQuest } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedSideQuest } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedSideQuest.module.scss';

const DetailedSideQuest = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedSideQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.sideQuests,
  );

  const [sideQuest, setSideQuest] = useState<ISideQuest | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSideQuest(Number(id), errorCallback);
      setSideQuest(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addSideQuestToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeSideQuestFromSaved(id));
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

    toggleSavedSideQuest(
      sideQuest!.id,
      isInArray(sideQuest!.id, savedSideQuests),
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
      {sideQuest && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.img}
                src={imageAPI.getImage(sideQuest.image!)}
                alt="side quest"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(sideQuest.id, savedSideQuests)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{sideQuest.name}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Guest giver:
                  </span>
                  <span className={styles.overview_item_value}>
                    {sideQuest.questGiver}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Is missable:
                  </span>
                  <span className={styles.overview_item_value}>
                    {`${sideQuest.isMissable}`}
                  </span>
                </p>
                {sideQuest.missableChapter && (
                  <p className={styles.overview_item}>
                    <span className={styles.overview_item_title}>
                      Missable chapter:
                    </span>
                    <span className={styles.overview_item_value}>
                      {sideQuest.missableChapter}
                    </span>
                  </p>
                )}
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Reward:</span>
                  <span className={styles.overview_item_value}>
                    {sideQuest.reward}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {sideQuest.location && (
            <div className={styles.location_wrapper}>
              <h2 className={styles.location_title}>Location</h2>
              <div className={styles.location_content}>
                <h3 className={styles.location_name}>
                  {sideQuest.location.name}
                </h3>
                <div className={styles.img_wrapper}>
                  <img
                    className={styles.img}
                    src={imageAPI.getImage(sideQuest.location.image)}
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

export default DetailedSideQuest;

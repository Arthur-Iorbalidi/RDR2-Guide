import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import Message from '@src/components/ui/Message/Message';
import images from '@src/constants/images';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  addAnimalToSaved,
  removeAnimalFromSaved,
} from '@src/store/slices/userSlice';
import { IAnimal } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedAnimal } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './DetailedAnimal.module.scss';

const DetailedAnimal = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const savedAnimals = useAppSelector(
    (state) => state.userReducer.userInfo?.animals,
  );

  const [animal, setAnimal] = useState<IAnimal | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getAnimal(Number(id), errorCallback);
      setAnimal(data);
      setIsLoading(false);
    })();
  }, []);

  const succesAdd = (id: number) => {
    dispatch(addAnimalToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeAnimalFromSaved(id));
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

    toggleSavedAnimal(
      animal!.id,
      isInArray(animal!.id, savedAnimals),
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
      {animal && (
        <div className={styles.wrapper}>
          <button className={styles.back_btn} onClick={goBack}>
            <img src={images.goBackIcon} alt="go back" />
          </button>
          <div className={styles.img_info}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.img}
                src={imageAPI.getImage(animal.image!)}
                alt="animal"
                onError={(e) => {
                  e.currentTarget.src = images.imgPlaceholder;
                }}
              />
              <div className={styles.favourite_btn_wrapper}>
                <FavoriteButton
                  isInFavorites={isInArray(animal.id, savedAnimals)}
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.main_info}>
                <h2 className={styles.title}>{animal.name}</h2>
              </div>
              <div className={styles.overview}>
                <h2 className={styles.overview_title}>Overview</h2>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>Hostility:</span>
                  <span className={styles.overview_item_value}>
                    {animal.hostility}
                  </span>
                </p>
                <p className={styles.overview_item}>
                  <span className={styles.overview_item_title}>
                    Is legendary:
                  </span>
                  <span className={styles.overview_item_value}>
                    {`${animal.isLegendary}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {animal.location && (
            <div className={styles.location_wrapper}>
              <h2 className={styles.location_title}>Location</h2>
              <div className={styles.location_content}>
                <h3 className={styles.location_name}>{animal.location.name}</h3>
                <div className={styles.img_wrapper}>
                  <img
                    className={styles.img}
                    src={imageAPI.getImage(animal.location.image)}
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

export default DetailedAnimal;

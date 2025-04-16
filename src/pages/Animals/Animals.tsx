import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { changeAnimalsPage } from '@src/store/slices/searchSlice';
import {
  addAnimalToSaved,
  removeAnimalFromSaved,
  setSavedAnimals,
} from '@src/store/slices/userSlice';
import { IAnimalsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedAnimal } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Animals.module.scss';

const Animals = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedAnimals = useAppSelector(
    (state) => state.userReducer.userInfo?.animals,
  );

  const [animals, setAnimals] = useState<IAnimalsResponse | undefined>(
    undefined,
  );

  const params = useAppSelector((state) => state.searchReducer.animals);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedAnimals) {
        const savedAnimals = await serverAPI.getSavedAnimals();
        dispatch(setSavedAnimals(savedAnimals));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getAnimals(params);
      setAnimals(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedAnimal(
      id,
      isInArray(id, savedAnimals, 'animalId'),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addAnimalToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeAnimalFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangePage = (count: number) => {
    dispatch(changeAnimalsPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Animals</h2>

        <Grid isLoading={isLoading}>
          {animals &&
            animals.data.map((animal) => (
              <Item
                key={animal.id}
                id={animal.id}
                handleBtnClickCallback={handleToggleSaved}
                title={animal.name}
                image={imageAPI.getImage(animal.image!)}
                isActive={isInArray(animal.id, savedAnimals, 'animalId')}
                navigateTo={`${routes.animals}/${animal.id}`}
              />
            ))}
        </Grid>

        {animals?.pagination && (
          <Pagination
            pagination={animals?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Animals;

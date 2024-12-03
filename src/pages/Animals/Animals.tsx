import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  changeAnimalsPage,
  changeAnimalsSearch,
  resetAnimalsPage,
} from '@src/store/slices/searchSlice';
import {
  addAnimalToSaved,
  removeAnimalFromSaved,
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
      setIsLoading(true);
      const data = await serverAPI.getAnimals(params);
      setAnimals(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedAnimal(
      id,
      isInArray(id, savedAnimals),
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

  const handleChangeSearch = (search: string) => {
    dispatch(changeAnimalsSearch(search));
    dispatch(resetAnimalsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeAnimalsPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

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
                isActive={isInArray(animal.id, savedAnimals)}
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

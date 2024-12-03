import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  changePlantsPage,
  changePlantsSearch,
  resetPlantsPage,
} from '@src/store/slices/searchSlice';
import {
  addPlantToSaved,
  removePlantFromSaved,
} from '@src/store/slices/userSlice';
import { IPlantsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedPlant } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Plants.module.scss';

const Plants = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedPlants = useAppSelector(
    (state) => state.userReducer.userInfo?.plants,
  );

  const [plants, setPlants] = useState<IPlantsResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.plants);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getPlants(params);
      setPlants(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedPlant(
      id,
      isInArray(id, savedPlants),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addPlantToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removePlantFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changePlantsSearch(search));
    dispatch(resetPlantsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changePlantsPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

        <h2 className={styles.header}>Plants</h2>

        <Grid isLoading={isLoading}>
          {plants &&
            plants.data.map((plant) => (
              <Item
                key={plant.id}
                id={plant.id}
                handleBtnClickCallback={handleToggleSaved}
                title={plant.name}
                image={imageAPI.getImage(plant.image!)}
                isActive={isInArray(plant.id, savedPlants)}
                navigateTo={`${routes.plants}/${plant.id}`}
              />
            ))}
        </Grid>

        {plants?.pagination && (
          <Pagination
            pagination={plants?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Plants;

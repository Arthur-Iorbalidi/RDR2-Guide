import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  changeFishesPage,
  changeFishesSearch,
  resetFishesPage,
} from '@src/store/slices/searchSlice';
import {
  addFishToSaved,
  removeFishFromSaved,
} from '@src/store/slices/userSlice';
import { IFishesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedFish } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Fishes.module.scss';

const Fishes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedFishes = useAppSelector(
    (state) => state.userReducer.userInfo?.fishes,
  );

  const [fishes, setFishes] = useState<IFishesResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.fishes);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFishes(params);
      setFishes(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedFish(
      id,
      isInArray(id, savedFishes),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addFishToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeFishFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeFishesSearch(search));
    dispatch(resetFishesPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeFishesPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

        <h2 className={styles.header}>Fishes</h2>

        <Grid isLoading={isLoading}>
          {fishes &&
            fishes.data.map((fish) => (
              <Item
                key={fish.id}
                id={fish.id}
                handleBtnClickCallback={handleToggleSaved}
                title={fish.name}
                isActive={isInArray(fish.id, savedFishes)}
                navigateTo={`${routes.fishes}/${fish.id}`}
              />
            ))}
        </Grid>

        {fishes?.pagination && (
          <Pagination
            pagination={fishes?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Fishes;

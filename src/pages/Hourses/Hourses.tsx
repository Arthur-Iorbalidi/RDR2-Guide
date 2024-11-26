import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import Sorting from '@src/components/Sorting/Sorting';
import routes from '@src/constants/routes';
import sortOptions from '@src/constants/sortOptions';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  changeHorsesPage,
  changeHorsesSearch,
  changeHorsesSort,
  changeHorsesSortOrder,
  resetHorsesPage,
} from '@src/store/slices/searchSlice';
import {
  addHorseToSaved,
  removeHorseFromSaved,
} from '@src/store/slices/userSlice';
import { IHorsesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedHorse } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Hourses.module.scss';

const Horses = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedHorses = useAppSelector(
    (state) => state.userReducer.userInfo?.horses,
  );

  const [horses, setHorses] = useState<IHorsesResponse | undefined>(undefined);

  const params = useAppSelector((state) => state.searchReducer.horses);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getHorses(params);
      setHorses(data);
      setIsLoading(false);
    })();
  }, [params]);

  const currentSortOptionIndex =
    sortOptions.horses.findIndex(
      (option) =>
        option.value.sortBy === params.sortBy &&
        option.value.sortOrder === params.sortOrder,
    ) || 0;

  const handleToggleSaved = (id: number) => {
    toggleSavedHorse(
      id,
      isInArray(id, savedHorses),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addHorseToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeHorseFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeHorsesSearch(search));
    dispatch(resetHorsesPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeHorsesPage(params.page! + count));
  };

  const handleChangeSorting = (index: number) => {
    dispatch(changeHorsesSort(sortOptions.horses[index].value.sortBy));
    dispatch(changeHorsesSortOrder(sortOptions.horses[index].value.sortOrder));
  };

  return (
    <section className={styles.horses_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

        <Sorting
          sortOptions={sortOptions.horses.map((elem) => elem.title)}
          currentSortOptionIndex={currentSortOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Horses</h2>

        <Grid isLoading={isLoading}>
          {horses &&
            horses.data.map((horse) => (
              <Item
                key={horse.id}
                id={horse.id}
                handleBtnClickCallback={handleToggleSaved}
                title={horse.name}
                image={imageAPI.getImage(horse.image!)}
                isActive={isInArray(horse.id, savedHorses)}
                navigateTo={`${routes.horses}/${horse.id}`}
              />
            ))}
        </Grid>

        {horses?.pagination && (
          <Pagination
            pagination={horses?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Horses;

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
  changeWeaponsPage,
  changeWeaponsSearch,
  changeWeaponsSort,
  changeWeaponsSortOrder,
  resetWeaponsPage,
} from '@src/store/slices/searchSlice';
import {
  addWeaponToSaved,
  removeWeaponFromSaved,
} from '@src/store/slices/userSlice';
import { IWeaponsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedWeapon } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Weapons.module.scss';

const Weapons = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedWeapons = useAppSelector(
    (state) => state.userReducer.userInfo?.weapons,
  );

  const [weapons, setWeapons] = useState<IWeaponsResponse | undefined>(
    undefined,
  );

  const params = useAppSelector((state) => state.searchReducer.weapons);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getWeapons(params);
      setWeapons(data);
      setIsLoading(false);
    })();
  }, [params]);

  const currentSortOptionIndex =
    sortOptions.weapons.findIndex(
      (option) =>
        option.value.sortBy === params.sortBy &&
        option.value.sortOrder === params.sortOrder,
    ) || 0;

  const handleToggleSaved = (id: number) => {
    toggleSavedWeapon(
      id,
      isInArray(id, savedWeapons),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addWeaponToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeWeaponFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeWeaponsSearch(search));
    dispatch(resetWeaponsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeWeaponsPage(params.page! + count));
  };

  const handleChangeSorting = (index: number) => {
    dispatch(changeWeaponsSort(sortOptions.weapons[index].value.sortBy));
    dispatch(
      changeWeaponsSortOrder(sortOptions.weapons[index].value.sortOrder),
    );
  };

  return (
    <section className={styles.weapons_page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

        <Sorting
          sortOptions={sortOptions.weapons.map((elem) => elem.title)}
          currentSortOptionIndex={currentSortOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />

        <h2 className={styles.header}>Weapons</h2>

        <Grid isLoading={isLoading}>
          {weapons &&
            weapons.data
              .slice(1, 4)
              .map((weapon) => (
                <Item
                  key={weapon.id}
                  id={weapon.id}
                  handleBtnClickCallback={handleToggleSaved}
                  title={weapon.name}
                  image={imageAPI.getImage(weapon.image!)}
                  isActive={isInArray(weapon.id, savedWeapons)}
                  navigateTo={`${routes.weapons}/${weapon.id}`}
                />
              ))}
        </Grid>

        {weapons?.pagination && (
          <Pagination
            pagination={weapons?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Weapons;

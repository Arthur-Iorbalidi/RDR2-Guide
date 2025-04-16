import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { changeWeaponsPage } from '@src/store/slices/searchSlice';
import {
  addWeaponToSaved,
  removeWeaponFromSaved,
  setSavedWeapons,
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

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

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
      if (isAuthorized && !savedWeapons) {
        const savedWeapons = await serverAPI.getSavedWeapons();
        dispatch(setSavedWeapons(savedWeapons));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getWeapons(params);
      setWeapons(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedWeapon(
      id,
      isInArray(id, savedWeapons, 'weaponId'),
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

  const handleChangePage = (count: number) => {
    dispatch(changeWeaponsPage(params.page! + count));
  };

  return (
    <section className={styles.weapons_page}>
      <div className={styles.wrapper}>
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
                  isActive={isInArray(weapon.id, savedWeapons, 'weaponId')}
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

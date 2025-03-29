import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removeWeaponFromSaved,
  setSavedWeapons,
} from '@src/store/slices/userSlice';
import { ISavedWeaponsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedWeapon } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedWeapons = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedWeapons = useAppSelector(
    (state) => state.userReducer.userInfo?.weapons,
  );

  const [weapons, setWeapons] = useState<
    ISavedWeaponsResponse['data'] | undefined
  >(undefined);

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
      const data = await serverAPI.getSavedWeapons();
      setWeapons(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedWeapon(
      id,
      isInArray(id, savedWeapons, 'weaponId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeWeaponFromSaved(id));
    setWeapons((prevWeapons) =>
      prevWeapons!.filter((weapon) => weapon.weapon.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={weapons?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {weapons &&
          weapons.map((weapon) => (
            <Item
              key={weapon.weapon.id}
              id={weapon.weapon.id}
              handleBtnClickCallback={handleToggleSaved}
              title={weapon.weapon.name}
              image={imageAPI.getImage(weapon.weapon.image!)}
              isActive={isInArray(weapon.weapon.id, savedWeapons, 'weaponId')}
              navigateTo={`${routes.weapons}/${weapon.weapon.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedWeapons;

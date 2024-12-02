import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeWeaponFromSaved } from '@src/store/slices/userSlice';
import { IWeapon } from '@src/types/serverAPITypes';
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

  const savedWeapons = useAppSelector(
    (state) => state.userReducer.userInfo?.weapons,
  );

  const [weapons, setWeapons] = useState<IWeapon[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

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
      isInArray(id, savedWeapons),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeWeaponFromSaved(id));
    setWeapons((prevWeapons) =>
      prevWeapons?.filter((weapon) => weapon.id !== id),
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
              key={weapon.id}
              id={weapon.id}
              handleBtnClickCallback={handleToggleSaved}
              title={weapon.name}
              image={imageAPI.getImage(weapon.image!)}
              isActive={isInArray(weapon.id, savedWeapons)}
              navigateTo={`${routes.weapons}/${weapon.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedWeapons;

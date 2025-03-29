import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removeHorseFromSaved,
  setSavedHorses,
} from '@src/store/slices/userSlice';
import { ISavedHorsesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedHorse } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedHorses = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedHorses = useAppSelector(
    (state) => state.userReducer.userInfo?.horses,
  );

  const [horses, setHorses] = useState<
    ISavedHorsesResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedHorses) {
        const savedHorses = await serverAPI.getSavedHorses();
        dispatch(setSavedHorses(savedHorses));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedHorses();
      setHorses(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedHorse(
      id,
      isInArray(id, savedHorses, 'horseId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeHorseFromSaved(id));
    setHorses((prevHorses) =>
      prevHorses?.filter((horse) => horse.horseId !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={horses?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {horses &&
          horses.map((horse) => (
            <Item
              key={horse.horse.id}
              id={horse.horse.id}
              handleBtnClickCallback={handleToggleSaved}
              title={horse.horse.breed}
              image={imageAPI.getImage(horse.horse.image!)}
              isActive={isInArray(horse.horse.id, savedHorses, 'horseId')}
              navigateTo={`${routes.horses}/${horse.horse.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedHorses;

import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removeAnimalFromSaved,
  setSavedAnimals,
} from '@src/store/slices/userSlice';
import { ISavedAnimalsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedAnimal } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedAnimals = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedAnimals = useAppSelector(
    (state) => state.userReducer.userInfo?.animals,
  );

  const [animals, setAnimals] = useState<
    ISavedAnimalsResponse['data'] | undefined
  >(undefined);

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
      const data = await serverAPI.getSavedAnimals();
      setAnimals(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedAnimal(
      id,
      isInArray(id, savedAnimals, 'animalId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeAnimalFromSaved(id));
    setAnimals((prevAnimals) =>
      prevAnimals!.filter((animal) => animal.animal.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={animals?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {animals &&
          animals.map((animal) => (
            <Item
              key={animal.animal.id}
              id={animal.animal.id}
              handleBtnClickCallback={handleToggleSaved}
              title={animal.animal.name}
              image={imageAPI.getImage(animal.animal.image!)}
              isActive={isInArray(animal.animal.id, savedAnimals, 'animalId')}
              navigateTo={`${routes.animals}/${animal.animal.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedAnimals;

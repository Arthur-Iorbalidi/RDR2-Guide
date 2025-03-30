import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removePlantFromSaved,
  setSavedPlants,
} from '@src/store/slices/userSlice';
import { ISavedPlantsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedPlant } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedPlants = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedPlants = useAppSelector(
    (state) => state.userReducer.userInfo?.plants,
  );

  const [plants, setPlants] = useState<
    ISavedPlantsResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedPlants) {
        const savedPlants = await serverAPI.getSavedPlants();
        dispatch(setSavedPlants(savedPlants));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedPlants();
      setPlants(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedPlant(
      id,
      isInArray(id, savedPlants, 'plantId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removePlantFromSaved(id));
    setPlants((prevPlants) =>
      prevPlants!.filter((plant) => plant.plant.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={plants?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {plants &&
          plants.map((plant) => (
            <Item
              key={plant.plant.id}
              id={plant.plant.id}
              handleBtnClickCallback={handleToggleSaved}
              title={plant.plant.name}
              image={imageAPI.getImage(plant.plant.image!)}
              isActive={isInArray(plant.plant.id, savedPlants, 'plantId')}
              navigateTo={`${routes.plants}/${plant.plant.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedPlants;

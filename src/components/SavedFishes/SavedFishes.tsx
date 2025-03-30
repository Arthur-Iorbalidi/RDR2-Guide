import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  removeFishFromSaved,
  setSavedFishes,
} from '@src/store/slices/userSlice';
import { ISavedFishesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedFish } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item from '../Item/Item';

const SavedFishes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedFishes = useAppSelector(
    (state) => state.userReducer.userInfo?.fishes,
  );

  const [fishes, setFishes] = useState<
    ISavedFishesResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedFishes) {
        const savedFishes = await serverAPI.getSavedFishes();
        dispatch(setSavedFishes(savedFishes));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedFishes();
      setFishes(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedFish(
      id,
      isInArray(id, savedFishes, 'fishId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeFishFromSaved(id));
    setFishes((prevFishes) =>
      prevFishes!.filter((fish) => fish.fish.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={fishes?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {fishes &&
          fishes.map((fish) => (
            <Item
              key={fish.fish.id}
              id={fish.fish.id}
              handleBtnClickCallback={handleToggleSaved}
              title={fish.fish.name}
              isActive={isInArray(fish.fish.id, savedFishes, 'fishId')}
              navigateTo={`${routes.fishes}/${fish.fish.id}`}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedFishes;

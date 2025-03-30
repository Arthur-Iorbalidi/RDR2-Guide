import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removeCollectibleFromSaved,
  setSavedCollectibles,
} from '@src/store/slices/userSlice';
import { ISavedCollectiblesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedCollectible } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item from '../Item/Item';

const SavedCollectibles = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedCollectibles = useAppSelector(
    (state) => state.userReducer.userInfo?.collectibles,
  );

  const [collectibles, setCollectibles] = useState<
    ISavedCollectiblesResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedCollectibles) {
        const savedCollectibles = await serverAPI.getSavedCollectibles();
        dispatch(setSavedCollectibles(savedCollectibles));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedCollectibles();
      setCollectibles(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedCollectible(
      id,
      isInArray(id, savedCollectibles, 'collectibleId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeCollectibleFromSaved(id));
    setCollectibles((prevCollectibles) =>
      prevCollectibles!.filter(
        (collectible) => collectible.collectible.id !== id,
      ),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={
          collectibles?.length === 0 ? 'There is nothing here' : undefined
        }
        layoutType={LayoutType.twoColumns}
      >
        {collectibles &&
          collectibles.map((collectible) => (
            <Item
              key={collectible.collectible.id}
              id={collectible.collectible.id}
              handleBtnClickCallback={handleToggleSaved}
              title={collectible.collectible.name}
              image={imageAPI.getImage(collectible.collectible.image!)}
              isActive={isInArray(
                collectible.collectible.id,
                savedCollectibles,
                'collectibleId',
              )}
              navigateTo={`${routes.collectibles}/${collectible.collectible.id}`}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedCollectibles;

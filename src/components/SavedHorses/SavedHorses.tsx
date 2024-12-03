import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeHorseFromSaved } from '@src/store/slices/userSlice';
import { IHorse } from '@src/types/serverAPITypes';
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

  const savedHorses = useAppSelector(
    (state) => state.userReducer.userInfo?.horses,
  );

  const [horses, setHorses] = useState<IHorse[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

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
      isInArray(id, savedHorses),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeHorseFromSaved(id));
    setHorses((prevHorses) => prevHorses?.filter((horse) => horse.id !== id));
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
              key={horse.id}
              id={horse.id}
              handleBtnClickCallback={handleToggleSaved}
              title={horse.name}
              image={imageAPI.getImage(horse.image!)}
              isActive={isInArray(horse.id, savedHorses)}
              navigateTo={`${routes.horses}/${horse.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedHorses;

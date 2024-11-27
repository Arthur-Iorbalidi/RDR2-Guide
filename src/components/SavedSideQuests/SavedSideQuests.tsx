import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeSideQuestFromSaved } from '@src/store/slices/userSlice';
import { ISideQuest } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedSideQuest } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedSideQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedSideQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.sideQuests,
  );

  const [sideQuests, setSideQuests] = useState<ISideQuest[] | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedSideQuests();
      setSideQuests(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedSideQuest(
      id,
      isInArray(id, savedSideQuests),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeSideQuestFromSaved(id));
    setSideQuests((prevSideQuests) =>
      prevSideQuests?.filter((sideQuest) => sideQuest.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      <Grid
        isLoading={isLoading}
        message={sideQuests?.length === 0 ? 'There is nothing here' : undefined}
        layoutType={LayoutType.twoColumns}
      >
        {sideQuests &&
          sideQuests.map((sideQuest) => (
            <Item
              key={sideQuest.id}
              id={sideQuest.id}
              handleBtnClickCallback={handleToggleSaved}
              title={sideQuest.name}
              image={imageAPI.getImage(sideQuest.image!)}
              isActive={isInArray(sideQuest.id, savedSideQuests)}
              navigateTo={`${routes.sideQuests}/${sideQuest.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedSideQuests;

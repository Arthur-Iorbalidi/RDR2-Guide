import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { removeStoryQuestFromSaved } from '@src/store/slices/userSlice';
import { IStoryQuest } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedStoryQuest } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedStoryQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedStoryQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.storyQuests,
  );

  const [storyQuests, setStoryQuests] = useState<IStoryQuest[] | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedStoryQuests();
      setStoryQuests(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedStoryQuest(
      id,
      isInArray(id, savedStoryQuests),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeStoryQuestFromSaved(id));
    setStoryQuests((prevStoryQuests) =>
      prevStoryQuests?.filter((storyQuest) => storyQuest.id !== id),
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
          storyQuests?.length === 0 ? 'There is nothing here' : undefined
        }
        layoutType={LayoutType.twoColumns}
      >
        {storyQuests &&
          storyQuests.map((storyQuest) => (
            <Item
              key={storyQuest.id}
              id={storyQuest.id}
              handleBtnClickCallback={handleToggleSaved}
              title={storyQuest.name}
              image={imageAPI.getImage(storyQuest.image!)}
              isActive={isInArray(storyQuest.id, savedStoryQuests)}
              navigateTo={`${routes.storyQuests}/${storyQuest.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedStoryQuests;

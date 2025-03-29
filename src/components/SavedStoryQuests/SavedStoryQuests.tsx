import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removeStoryQuestFromSaved,
  setSavedStoryQuests,
} from '@src/store/slices/userSlice';
import { ISavedStoryQuestsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedStoryQuest } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedStoryQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedStoryQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.storyQuests,
  );

  const [storyQuests, setStoryQuests] = useState<
    ISavedStoryQuestsResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedStoryQuests) {
        const savedStoryQuests = await serverAPI.getSavedStoryQuests();
        dispatch(setSavedStoryQuests(savedStoryQuests));
      }
    })();
  }, []);

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
      isInArray(id, savedStoryQuests, 'storyquestId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeStoryQuestFromSaved(id));
    setStoryQuests((prevStoryQuests) =>
      prevStoryQuests?.filter((storyQuest) => storyQuest.storyquest.id !== id),
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
              key={storyQuest.storyquest.id}
              id={storyQuest.storyquest.id}
              handleBtnClickCallback={handleToggleSaved}
              title={storyQuest.storyquest.name}
              image={imageAPI.getImage(storyQuest.storyquest.image!)}
              isActive={isInArray(
                storyQuest.storyquest.id,
                savedStoryQuests,
                'storyquestId',
              )}
              navigateTo={`${routes.storyQuests}/${storyQuest.storyquest.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedStoryQuests;

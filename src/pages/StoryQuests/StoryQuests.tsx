import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { changeStoryQuestsPage } from '@src/store/slices/searchSlice';
import {
  addStoryQuestToSaved,
  removeStoryQuestFromSaved,
  setSavedStoryQuests,
} from '@src/store/slices/userSlice';
import { IStoryQuestsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedStoryQuest } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './StoryQuests.module.scss';

const StoryQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedStoryQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.storyQuests,
  );

  const [storyQuests, setStoryQuests] = useState<
    IStoryQuestsResponse | undefined
  >(undefined);

  const params = useAppSelector((state) => state.searchReducer.storyQuests);

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
      const data = await serverAPI.getStoryQuests(params);
      setStoryQuests(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedStoryQuest(
      id,
      isInArray(id, savedStoryQuests, 'storyquestId'),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addStoryQuestToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeStoryQuestFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangePage = (count: number) => {
    dispatch(changeStoryQuestsPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Story Quests</h2>

        <Grid isLoading={isLoading}>
          {storyQuests &&
            storyQuests.data.map((storyQuest) => (
              <Item
                key={storyQuest.id}
                id={storyQuest.id}
                handleBtnClickCallback={handleToggleSaved}
                title={storyQuest.name}
                image={imageAPI.getImage(storyQuest.image!)}
                isActive={isInArray(
                  storyQuest.id,
                  savedStoryQuests,
                  'storyquestId',
                )}
                navigateTo={`${routes.storyQuests}/${storyQuest.id}`}
              />
            ))}
        </Grid>

        {storyQuests?.pagination && (
          <Pagination
            pagination={storyQuests?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default StoryQuests;

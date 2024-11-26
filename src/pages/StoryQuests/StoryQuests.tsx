import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import Sorting from '@src/components/Sorting/Sorting';
import routes from '@src/constants/routes';
import sortOptions from '@src/constants/sortOptions';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  changeStoryQuestsPage,
  changeStoryQuestsSearch,
  changeStoryQuestsSort,
  changeStoryQuestsSortOrder,
  resetStoryQuestsPage,
} from '@src/store/slices/searchSlice';
import {
  addStoryQuestToSaved,
  removeStoryQuestFromSaved,
} from '@src/store/slices/userSlice';
import { IStoryQuestsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedStoryQuest } from '@src/utils/toggleFavorites';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './StoryQuests.module.scss';

const StoryQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
      setIsLoading(true);
      const data = await serverAPI.getStoryQuests(params);
      setStoryQuests(data);
      setIsLoading(false);
    })();
  }, [params]);

  const currentSortOptionIndex =
    sortOptions.storyQuests.findIndex(
      (option) =>
        option.value.sortBy === params.sortBy &&
        option.value.sortOrder === params.sortOrder,
    ) || 0;

  const handleToggleSaved = (id: number) => {
    toggleSavedStoryQuest(
      id,
      isInArray(id, savedStoryQuests),
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

  const handleChangeSearch = (search: string) => {
    dispatch(changeStoryQuestsSearch(search));
    dispatch(resetStoryQuestsPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeStoryQuestsPage(params.page! + count));
  };

  const handleChangeSorting = (index: number) => {
    dispatch(
      changeStoryQuestsSort(sortOptions.storyQuests[index].value.sortBy),
    );
    dispatch(
      changeStoryQuestsSortOrder(
        sortOptions.storyQuests[index].value.sortOrder,
      ),
    );
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

        <Sorting
          sortOptions={sortOptions.storyQuests.map((elem) => elem.title)}
          currentSortOptionIndex={currentSortOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />

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
                isActive={isInArray(storyQuest.id, savedStoryQuests)}
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

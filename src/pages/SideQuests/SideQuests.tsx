import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import { changeSideQuestsPage } from '@src/store/slices/searchSlice';
import {
  addSideQuestToSaved,
  removeSideQuestFromSaved,
  setSavedSideQuests,
} from '@src/store/slices/userSlice';
import { ISideQuestsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedSideQuest } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './SideQuests.module.scss';

const SideQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedSideQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.sideQuests,
  );

  const [sideQuests, setSideQuests] = useState<ISideQuestsResponse | undefined>(
    undefined,
  );

  const params = useAppSelector((state) => state.searchReducer.sideQuests);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedSideQuests) {
        const savedSideQuests = await serverAPI.getSavedSideQuests();
        dispatch(setSavedSideQuests(savedSideQuests));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSideQuests(params);
      setSideQuests(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedSideQuest(
      id,
      isInArray(id, savedSideQuests, 'sidequestId'),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addSideQuestToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeSideQuestFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangePage = (count: number) => {
    dispatch(changeSideQuestsPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Side Quests</h2>

        <Grid isLoading={isLoading}>
          {sideQuests &&
            sideQuests.data.map((sideQuest) => (
              <Item
                key={sideQuest.id}
                id={sideQuest.id}
                handleBtnClickCallback={handleToggleSaved}
                title={sideQuest.name}
                image={imageAPI.getImage(sideQuest.image!)}
                isActive={isInArray(
                  sideQuest.id,
                  savedSideQuests,
                  'sidequestId',
                )}
                navigateTo={`${routes.sideQuests}/${sideQuest.id}`}
              />
            ))}
        </Grid>

        {sideQuests?.pagination && (
          <Pagination
            pagination={sideQuests?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default SideQuests;

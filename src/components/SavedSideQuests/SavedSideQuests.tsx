import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  removeSideQuestFromSaved,
  setSavedSideQuests,
} from '@src/store/slices/userSlice';
import { ISavedSideQuestsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedSideQuest } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Grid, { LayoutType } from '../Grid/Grid';
import Item, { Appearance } from '../Item/Item';

const SavedSideQuests = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedSideQuests = useAppSelector(
    (state) => state.userReducer.userInfo?.sideQuests,
  );

  const [sideQuests, setSideQuests] = useState<
    ISavedSideQuestsResponse['data'] | undefined
  >(undefined);

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
      const data = await serverAPI.getSavedSideQuests();
      setSideQuests(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedSideQuest(
      id,
      isInArray(id, savedSideQuests, 'sidequestId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeSideQuestFromSaved(id));
    setSideQuests((prevSideQuests) =>
      prevSideQuests?.filter((sideQuest) => sideQuest.sidequest.id !== id),
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
              key={sideQuest.sidequest.id}
              id={sideQuest.sidequest.id}
              handleBtnClickCallback={handleToggleSaved}
              title={sideQuest.sidequest.name}
              image={imageAPI.getImage(sideQuest.sidequest.image!)}
              isActive={isInArray(
                sideQuest.sidequest.id,
                savedSideQuests,
                'sidequestId',
              )}
              navigateTo={`${routes.sideQuests}/${sideQuest.sidequest.id}`}
              appearance={Appearance.horizontal}
            />
          ))}
      </Grid>
    </>
  );
};

export default SavedSideQuests;

import Grid from '@src/components/Grid/Grid';
import Item from '@src/components/Item/Item';
import Pagination from '@src/components/Pagination/Pagination';
import SearchForm from '@src/components/SearchForm/SearchForm';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import imageAPI from '@src/services/imageAPI';
import serverAPI from '@src/services/serverAPI';
import {
  changeCollectiblesPage,
  changeCollectiblesSearch,
  resetCollectiblesPage,
} from '@src/store/slices/searchSlice';
import {
  addCollectibleToSaved,
  removeCollectibleFromSaved,
} from '@src/store/slices/userSlice';
import { ICollectiblesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedCollectible } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Collectibles.module.scss';

const Collectibles = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedCollectibles = useAppSelector(
    (state) => state.userReducer.userInfo?.collectibles,
  );

  const [collectibles, setCollectibles] = useState<
    ICollectiblesResponse | undefined
  >(undefined);

  const params = useAppSelector((state) => state.searchReducer.collectibles);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getCollectibles(params);
      setCollectibles(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedCollectible(
      id,
      isInArray(id, savedCollectibles),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addCollectibleToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeCollectibleFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  const handleChangeSearch = (search: string) => {
    dispatch(changeCollectiblesSearch(search));
    dispatch(resetCollectiblesPage());
  };

  const handleChangePage = (count: number) => {
    dispatch(changeCollectiblesPage(params.page! + count));
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <SearchForm
          handleChangeQuery={handleChangeSearch}
          currentSearchValue={params.search!}
        />

        <h2 className={styles.header}>Collectibles</h2>

        <Grid isLoading={isLoading}>
          {collectibles &&
            collectibles.data.map((collectible) => (
              <Item
                key={collectible.id}
                id={collectible.id}
                handleBtnClickCallback={handleToggleSaved}
                title={collectible.name}
                image={imageAPI.getImage(collectible.image!)}
                isActive={isInArray(collectible.id, savedCollectibles)}
                navigateTo={`${routes.collectibles}/${collectible.id}`}
              />
            ))}
        </Grid>

        {collectibles?.pagination && (
          <Pagination
            pagination={collectibles?.pagination}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </section>
  );
};

export default Collectibles;

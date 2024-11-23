import Sorting from '@src/components/Sorting/Sorting';
import Loader from '@src/components/ui/Loader/Loader';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './Favorites.module.scss';

const Favorites = () => {
  const options = ['Movies', 'Actors', 'Directors'];

  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  const handleChangeSorting = (index: number) => {
    setCurrentOptionIndex(index);
  };

  if (isAuth === undefined) {
    return <Loader />;
  }

  if (isAuth === false) {
    return <Navigate to={routes.login} />;
  }

  return (
    <section className={styles.favorites_page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Favorites</h1>
        <Sorting
          sortOptions={options}
          currentSortOptionIndex={currentOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />
        {/* {options[currentOptionIndex] === 'Movies' && <FavoriteMovies />}
        {options[currentOptionIndex] === 'Actors' && <FavoriteActors />}
        {options[currentOptionIndex] === 'Directors' && <FavoriteDirectors />} */}
      </div>
    </section>
  );
};

export default Favorites;

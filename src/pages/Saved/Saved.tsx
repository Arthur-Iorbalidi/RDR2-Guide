import SavedHorses from '@src/components/SavedHorses/SavedHorses';
import SavedSideQuests from '@src/components/SavedSideQuests/SavedSideQuests';
import SavedStoryQuests from '@src/components/SavedStoryQuests/SavedStoryQuests';
import SavedWeapons from '@src/components/SavedWeapons/SavedWeapons';
import Sorting from '@src/components/Sorting/Sorting';
import Loader from '@src/components/ui/Loader/Loader';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './Saved.module.scss';

const Saved = () => {
  const options = ['Weapons', 'Horses', 'Story Quests', 'Side Quests'];

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
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Saved</h1>
        <Sorting
          sortOptions={options}
          currentSortOptionIndex={currentOptionIndex}
          handleChangeSorting={handleChangeSorting}
        />
        {options[currentOptionIndex] === 'Weapons' && <SavedWeapons />}
        {options[currentOptionIndex] === 'Horses' && <SavedHorses />}
        {options[currentOptionIndex] === 'Story Quests' && <SavedStoryQuests />}
        {options[currentOptionIndex] === 'Side Quests' && <SavedSideQuests />}
      </div>
    </section>
  );
};

export default Saved;

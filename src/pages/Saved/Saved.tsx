import SavedAnimals from '@src/components/SavedAnimals/SavedAnimals';
import SavedChallenges from '@src/components/SavedChallenges/SavedChallenges';
import SavedCollectibles from '@src/components/SavedCollectibles/SavedCollectibles';
import SavedFactions from '@src/components/SavedFactions/SavedFactions';
import SavedFishes from '@src/components/SavedFishes/SavedFishes';
import SavedHorses from '@src/components/SavedHorses/SavedHorses';
import SavedMiscellaneous from '@src/components/SavedMiscellaneous/SavedMiscellaneous';
import SavedPlants from '@src/components/SavedPlants/SavedPlants';
import SavedRandomEncounters from '@src/components/SavedRandomEncounters/SavedRandomEncounters';
import SavedSideQuests from '@src/components/SavedSideQuests/SavedSideQuests';
import SavedStoryQuests from '@src/components/SavedStoryQuests/SavedStoryQuests';
import SavedTableGames from '@src/components/SavedTableGames/SavedTableGames';
import SavedWeapons from '@src/components/SavedWeapons/SavedWeapons';
import Sorting from '@src/components/Sorting/Sorting';
import Loader from '@src/components/ui/Loader/Loader';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './Saved.module.scss';

const Saved = () => {
  const options = [
    'Weapons',
    'Horses',
    'Story Quests',
    'Side Quests',
    'Animals',
    'Plants',
    'Fishes',
    'Challenges',
    'Collectibles',
    'Factions',
    'Miscellaneous',
    'Random encounters',
    'Table games',
  ];

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
        {options[currentOptionIndex] === 'Animals' && <SavedAnimals />}
        {options[currentOptionIndex] === 'Plants' && <SavedPlants />}
        {options[currentOptionIndex] === 'Fishes' && <SavedFishes />}
        {options[currentOptionIndex] === 'Challenges' && <SavedChallenges />}
        {options[currentOptionIndex] === 'Collectibles' && (
          <SavedCollectibles />
        )}
        {options[currentOptionIndex] === 'Factions' && <SavedFactions />}
        {options[currentOptionIndex] === 'Miscellaneous' && (
          <SavedMiscellaneous />
        )}
        {options[currentOptionIndex] === 'Random encounters' && (
          <SavedRandomEncounters />
        )}
        {options[currentOptionIndex] === 'Table games' && <SavedTableGames />}
      </div>
    </section>
  );
};

export default Saved;

import routes from '@src/constants/routes';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import Account from '@src/pages/Account/Account';
import Animals from '@src/pages/Animals/Animals';
import Challenges from '@src/pages/Challenges/Challenges';
import Collectibles from '@src/pages/Collectibles/Collectibles';
import DetailedAnimal from '@src/pages/DetailedAnimal/DetailedAnimal';
import DetailedCollectible from '@src/pages/DetailedCollectible/DetailedCollectible';
import DetailedFish from '@src/pages/DetailedFish/DetailedFish';
import DetailedHorse from '@src/pages/DetailedHorse/DetailedHorse';
import DetailedPlant from '@src/pages/DetailedPlant/DetailedPlant';
import DetailedSideQuest from '@src/pages/DetailedSideQuest/DetailedSideQuest';
import DetailedStoryQuest from '@src/pages/DetailedStoryQuest/DetailedStoryQuest';
import DetailedWeapon from '@src/pages/DetailedWeapon/DetailedWeapon';
import Factions from '@src/pages/Factions/Factions';
import Fishes from '@src/pages/Fishes/Fishes';
import Home from '@src/pages/Home/Home';
import Hourses from '@src/pages/Hourses/Hourses';
import Miscellaneous from '@src/pages/Miscellaneous/Miscellaneous';
import Plants from '@src/pages/Plants/Plants';
import RandomEncounters from '@src/pages/RandomEncounters/RandomEncounters';
import Saved from '@src/pages/Saved/Saved';
import SideQuests from '@src/pages/SideQuests/SideQuests';
import StoryQuests from '@src/pages/StoryQuests/StoryQuests';
import TableGames from '@src/pages/TableGames/TableGames';
import Weapons from '@src/pages/Weapons/Weapons';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/*" element={<Navigate to={routes.home} replace />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.weapons} element={<Weapons />} />
          <Route path={routes.horses} element={<Hourses />} />
          <Route path={routes.storyQuests} element={<StoryQuests />} />
          <Route path={routes.sideQuests} element={<SideQuests />} />
          <Route path={routes.animals} element={<Animals />} />
          <Route path={routes.plants} element={<Plants />} />
          <Route path={routes.fishes} element={<Fishes />} />
          <Route path={routes.challenges} element={<Challenges />} />
          <Route path={routes.collectibles} element={<Collectibles />} />
          <Route path={routes.factions} element={<Factions />} />
          <Route path={routes.miscellaneous} element={<Miscellaneous />} />
          <Route
            path={routes.randomEncounters}
            element={<RandomEncounters />}
          />
          <Route path={routes.tableGames} element={<TableGames />} />
          <Route path={routes.detailedWeapon} element={<DetailedWeapon />} />
          <Route path={routes.detailedHorse} element={<DetailedHorse />} />
          <Route
            path={routes.detailedStoryQuest}
            element={<DetailedStoryQuest />}
          />
          <Route
            path={routes.detailedSideQuest}
            element={<DetailedSideQuest />}
          />
          <Route path={routes.detailedAnimal} element={<DetailedAnimal />} />
          <Route path={routes.detailedPlant} element={<DetailedPlant />} />
          <Route path={routes.detailedFish} element={<DetailedFish />} />
          <Route
            path={routes.detailedCollectible}
            element={<DetailedCollectible />}
          />
          <Route path={routes.account} element={<Account />} />
          <Route path={routes.saved} element={<Saved />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;

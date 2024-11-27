import routes from '@src/constants/routes';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import Account from '@src/pages/Account/Account';
import DetailedHorse from '@src/pages/DetailedHorse/DetailedHorse';
import DetailedSideQuest from '@src/pages/DetailedSideQuest/DetailedSideQuest';
import DetailedStoryQuest from '@src/pages/DetailedStoryQuest/DetailedStoryQuest';
import DetailedWeapon from '@src/pages/DetailedWeapon/DetailedWeapon';
import Home from '@src/pages/Home/Home';
import Hourses from '@src/pages/Hourses/Hourses';
import Saved from '@src/pages/Saved/Saved';
import SideQuests from '@src/pages/SideQuests/SideQuests';
import StoryQuests from '@src/pages/StoryQuests/StoryQuests';
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
          <Route path={routes.account} element={<Account />} />
          <Route path={routes.saved} element={<Saved />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;

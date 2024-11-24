import routes from '@src/constants/routes';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import Account from '@src/pages/Account/Account';
import DetailedWeapon from '@src/pages/DetailedWeapon/DetailedWeapon';
import Favorites from '@src/pages/Favorites/Favorites';
import Home from '@src/pages/Home/Home';
import Hourses from '@src/pages/Hourses/Hourses';
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
          {/* <Route path={routes.detailedHorse} element={<Hourses />} /> */}
          {/* <Route path={routes.detailedStoryQuest} element={<StoryQuests />} /> */}
          {/* <Route path={routes.detailedSideQuest} element={<SideQuests />} /> */}
          <Route path={routes.account} element={<Account />} />
          <Route path={routes.favorites} element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;

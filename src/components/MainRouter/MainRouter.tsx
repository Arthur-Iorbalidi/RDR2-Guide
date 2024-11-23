import routes from '@src/constants/routes';
import MainLayout from '@src/layouts/MainLayout/MainLayout';
import Account from '@src/pages/Account/Account';
import Favorites from '@src/pages/Favorites/Favorites';
import Home from '@src/pages/Home/Home';
import Hourses from '@src/pages/Hourses/Hourses';
import Locations from '@src/pages/Locations/Locations';
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
          <Route path={routes.locations} element={<Locations />} />
          <Route path={routes.weapons} element={<Weapons />} />
          <Route path={routes.hourses} element={<Hourses />} />
          <Route path={routes.storyQuests} element={<StoryQuests />} />
          <Route path={routes.sideQuests} element={<SideQuests />} />
          <Route path={routes.account} element={<Account />} />
          <Route path={routes.favorites} element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;

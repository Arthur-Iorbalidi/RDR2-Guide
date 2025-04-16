import './App.scss';

import routes from '@src/constants/routes';
import Login from '@src/pages/Login/Login';
import Registration from '@src/pages/Registration/Registration';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainRouter from './components/MainRouter/MainRouter';
import Loader from './components/ui/Loader/Loader';
import useAppDispatch from './hooks/useAppDispatch';
import useAppSelector from './hooks/useAppSelector';
import serverAPI from './services/serverAPI';
import { changeIsAuthorized, changeUserInfo } from './store/slices/userSlice';
import { ICheckUserResponse } from './types/serverAPITypes';

function App() {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function authCheckCallback(response: ICheckUserResponse) {
      dispatch(changeIsAuthorized(response.isAuthorized));
      dispatch(changeUserInfo(response.user));
      setLoading(false);
    }

    serverAPI.checkUser(authCheckCallback);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRouter />} />

        <Route
          path={routes.login}
          element={!isAuth ? <Login /> : <Navigate to={routes.weapons} />}
        />
        <Route
          path={routes.registration}
          element={
            !isAuth ? <Registration /> : <Navigate to={routes.weapons} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

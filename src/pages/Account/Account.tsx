import MainUserInfo from '@src/components/MainUserInfo/MainUserInfo';
import Loader from '@src/components/ui/Loader/Loader';
import UserPassword from '@src/components/UserPassword/UserPassword';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import { Navigate } from 'react-router-dom';

import styles from './Account.module.scss';

const Account = () => {
  const isAuth = useAppSelector((state) => state.userReducer.isAuthorized);

  if (isAuth === undefined) {
    return <Loader />;
  }

  if (isAuth === false) {
    return <Navigate to={routes.login} />;
  }

  return (
    <section className={styles.account_page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Account</h1>
        <MainUserInfo />
        <UserPassword />
      </div>
    </section>
  );
};

export default Account;

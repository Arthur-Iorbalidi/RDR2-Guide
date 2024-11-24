import { appName } from '@src/constants/applicationInfo';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <h2 className={styles.appName}>{appName}</h2>
      </div>
    </footer>
  );
};

export default Footer;

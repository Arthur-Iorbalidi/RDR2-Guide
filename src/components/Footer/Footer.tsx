import { appName } from '@src/constants/applicationInfo';
import authorInfo from '@src/constants/authorInfo';
import images from '@src/constants/images';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <h2 className={styles.appName}>{appName}</h2>
        <div className={styles.info}>
          <span className={styles.author}>{authorInfo.name}</span>
          <div className={styles.links}>
            <a href={authorInfo.githubLink}>
              <img src={images.githubLogo} alt="github link" />
            </a>
            <a href={authorInfo.linkedLnLink}>
              <img src={images.linkedlnLogo} alt="linkedin link" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

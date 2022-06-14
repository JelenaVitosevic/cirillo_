import React from 'react';
import styles from './Footer.module.css';
import { FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
        <p className={styles.authorText}>Made with love by JecaV</p>
        <div className={styles.iconWrapper}>
            <a href='https://www.instagram.com/jelena__vitosevic/' className={styles.iconLink}>
              <FaInstagram className={styles.icon} />
            </a>
            <a href="https://github.com/JelenaVitosevic" className={styles.iconLink}>
              <FaGithub className={styles.icon} />
            </a>
        </div>
        <p className={styles.rightsText}>
          @cirillo 2022. All Rights Reserved
        </p>
    </div>
  )
}

export default Footer
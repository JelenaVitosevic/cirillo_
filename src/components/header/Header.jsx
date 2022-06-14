import React from 'react';
import styles from './Header.module.css';
import { FaUserAlt, FaRegChartBar, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logoContainer}>
            <img src="./cirillo.png" className={styles.img}/>
            <Link to="/" className={styles.logo}>cirillo</Link>
        </div>
        <nav className={styles.headerNav}>
          <ul className={styles.headerList}>
            <li className={styles.headerListItem}>
              <Link to='/login' className={styles.navIconLink}>
                <FaUserAlt className={styles.navIcon}/>
              </Link>
            </li>
            <li className={styles.headerListItem}>
              <Link to='/statistic' className={styles.navIconLink}>
                <FaRegChartBar className={styles.navIcon}/>
              </Link>
            </li>
            <li className={styles.headerListItem}>
              <Link to='/settings' className={styles.navIconLink}>
                <FaCog className={styles.navIcon}/>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

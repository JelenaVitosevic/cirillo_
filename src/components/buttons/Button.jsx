import React from 'react';
import styles from './Button.module.css';

function Button({children, buttonStyle, myFunction}) {
  return (
    <div className={styles.buttonWrapper}>
        <button onClick={myFunction} className={`${styles.button} ${styles[buttonStyle]}`}>
            {children}
        </button>
    </div>
  )
}

export default Button
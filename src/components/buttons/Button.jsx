import React from 'react';
import styles from './Button.module.css';

function Button({children, buttonStyle, myFunction, activeStyle, _callback}) {
  return (
    <div className={styles.buttonWrapper}>
        <button onClick={myFunction} className={`${styles.button} ${styles[buttonStyle]}` /*${styles[activeStyle]}*/}>
            {children}
        </button>
    </div>
  )
}

export default Button
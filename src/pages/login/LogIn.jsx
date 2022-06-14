import React from 'react'
import styles from './LogIn.module.css'
import Button from '../../components/buttons/Button';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

function LogIn() {
  return (
   <Layout>
    <div className={styles.container}>
    <div className={styles.contentWrapper}>
      <form noValidate className={styles.form}>
        <label htmlFor="email"  className={styles.label}>Email:</label>
        <input type="text" id='email' name='email' placeholder='Enter your email' className={styles.input}/>
        <label htmlFor="password"  className={styles.label}>Password:</label>
        <input type="text" id='password' name='password' placeholder='Enter your password' className={styles.input}/>
        <Button buttonStyle={'submit'} type='button'>Log in</Button>
      </form> 
    </div>
    <div className={styles.registerWrapper}>
      <p className={styles.text}>Do not have an acount?</p>
      <Link to='/register' className={styles.link}>Register now</Link>
    </div>
    </div>
   </Layout>
  )
}

export default LogIn
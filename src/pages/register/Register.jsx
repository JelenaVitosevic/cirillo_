import React, { useContext } from 'react'
import Button from '../../components/buttons/Button';
import styles from './Register.module.css'
import { CirilloContext } from '../../context/CirilloContext';



function Register() {

  const { user, setNewUser, Register, message } = useContext(CirilloContext)

  function handleClick(e) {
    Register()
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <pre className={styles.user}>{JSON.stringify(user)}</pre>
    <div className={styles.contentWrapper}>
      <form noValidate className={styles.form} onSubmit={handleClick}>
        <label htmlFor="firstName"  className={styles.label}>First name:</label>
        <input type="text" id='firstName' name='firstName' placeholder='Enter your first name' className={styles.input} onChange={(e) => setNewUser('firstName', e.target.value)} />
        <label htmlFor="lastName"  className={styles.label}>Last name:</label>
        <input type="text" id='lastName' name='lastName' placeholder='Enter your last name' className={styles.input} onChange={(e) => setNewUser('lastName', e.target.value)}/>
        <label htmlFor="email"  className={styles.label}>Email:</label>
        <input type="text" id='email' name='email' placeholder='Enter your email' className={styles.input} onChange={(e) => setNewUser('email', e.target.value)}/>
        {message && <div className={styles.message}>{message}</div>}
        <label htmlFor="password"  className={styles.label}>Password:</label>
        <input type="text" id='password' name='password' placeholder='Enter your password' className={styles.input} onChange={(e) => setNewUser('password', e.target.value)}/>
        <Button buttonStyle={'submit'} type='button'>Register now</Button>
      </form>  
    </div>
    </div>
  )
}

export default Register
import React, { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import styles from './Register.module.css'
import { CirilloContext } from '../../context/CirilloContext';
import Layout from '../../components/layout/Layout';



function Register() {

  const { user, setNewUser, Register, emailMessage, passwordMessage } = useContext(CirilloContext)

  const navigate = useNavigate()

  function handleClick(e) {
    Register(navigate)
    e.preventDefault()
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <form noValidate className={styles.form} onSubmit={handleClick}>
            <label 
              htmlFor="firstName" 
              className={styles.label}
            >
              First name:
            </label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                id='firstName' 
                name='firstName' 
                placeholder='Enter your first name' 
                className={styles.input}
                onChange={(e) => setNewUser('firstName', e.target.value)} 
              />
            </div>
            <label 
              htmlFor="lastName" 
              className={styles.label}
            >
              Last name:
            </label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                id='lastName' 
                name='lastName' 
                placeholder='Enter your last name' 
                className={styles.input} 
                onChange={(e) => setNewUser('lastName', e.target.value)}
              />
            </div>
            <label 
              htmlFor="email" 
              className={styles.label}
            >
              Email:
            </label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                id='email' 
                name='email' 
                placeholder='Enter your email' 
                className={styles.input} 
                onChange={(e) => setNewUser('email', e.target.value)}
              />
              {emailMessage && <div className={styles.message}>{emailMessage}</div>}
            </div>
            <label 
              htmlFor="password" 
              className={styles.label}
            >
              Password:
            </label>
            <div 
              className={styles.inputWrapper}>
              <input 
                type="text" 
                id='password' 
                name='password' 
                placeholder='Enter your password' 
                className={styles.input} 
                onChange={(e) => setNewUser('password', e.target.value)}
              />
              {passwordMessage && <div className={styles.message}>{passwordMessage}</div>}
            </div>
            <Button 
              buttonStyle={'submit'} 
              type='button'
            >
              Register now
            </Button>
          </form>  
        </div>
      </div>
    </Layout>
  )
}

export default Register
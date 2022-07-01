import React, { useContext } from 'react'
import axios from 'axios';
import styles from './LogIn.module.css'
import Button from '../../components/buttons/Button';
import { Link } from 'react-router-dom';
import { CirilloContext } from '../../context/CirilloContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

function LogIn() {

  const { setNewLogUser, Login, emailMessage, passwordMessage } = useContext(CirilloContext)

  const navigate = useNavigate()

  function handleClick(e) {
    Login(navigate)
    e.preventDefault()
  }

  return (
   <Layout>
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
       <form noValidate className={styles.form} onSubmit={handleClick}>
         <label 
           htmlFor="email" 
           className={styles.label}
         >
           Email:
         </label>
         <input 
           type="text" 
           id='email' 
           name='email' 
           placeholder='Enter your email' 
           className={styles.input}
           onChange={(e) => setNewLogUser('email', e.target.value)}
         />
         <label 
           htmlFor="password" 
           className={styles.label}
         >
           Password:
         </label>
         <input 
           type="text" 
           id='password' 
           name='password' 
           placeholder='Enter your password' 
           className={styles.input}
           onChange={(e) => setNewLogUser('password', e.target.value)}
         />
         <Button 
           buttonStyle={'submit'} 
           type='button'
         >
            Log in
         </Button>
       </form> 
     </div>
    <div className={styles.registerWrapper}>
      <p className={styles.text}>
        Do not have an acount?
      </p>
      <Link 
        to='/register' 
        className={styles.link}
      >
        Register now
      </Link>
    </div>
    </div>
   </Layout>
  )
}

export default LogIn
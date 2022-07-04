import React, { useContext } from 'react'
import styles from './Logout.module.css'
import Button from '../../components/buttons/Button';
import { Link } from 'react-router-dom';
import { CirilloContext } from '../../context/CirilloContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

function Logout() {

    const { setNewLogUser, LogOut } = useContext(CirilloContext)
  
    const navigate = useNavigate()
  
    function handleClick(e) {
      LogOut(navigate)
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
              Do you want to log out?
            </label>
            <Button 
              buttonStyle={'submit'} 
              type='button'
            >
                Log out
            </Button>
          </form> 
        </div>
        </div>
      </Layout>
    )
  }
  
  export default Logout
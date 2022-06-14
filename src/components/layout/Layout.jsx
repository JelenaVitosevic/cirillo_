import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import styles from './Layout.module.css'

function Layout({children}) {
  return (
    <div className={styles.layout}>
        <Header/>
            {children}
        <Footer/>
    </div>
  )
}

export default Layout
import React from 'react'
import Layout from '../../components/layout/Layout';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <Layout>
      <div className={styles.container}>
        ERROR! PAGE NOT FOUND!
      </div>
    </Layout>
  )
}

export default ErrorPage
import React from 'react'
import styles from './Statistic.module.css'
import { CirilloContext } from '../../context/CirilloContext';
import { useContext } from "react";
import Layout from '../../components/layout/Layout'

function Statistic() {

  const {
    tasks,
  } = useContext(CirilloContext)

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
         <div className={styles.titleWrapper}> <h3 className={styles.title}>YOUR WORK TIME</h3> </div>
      <table className={styles.table}>
        <tr className={styles.tableRows}>
          <th className={styles.tableRow}>name</th>
          <th className={styles.tableRow}>time (min)</th>
          <th className={styles.tableRow}>status</th>
        </tr>
        {tasks.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.time/60}</td>
              <td>{val.status}</td>
            </tr>
          )
        })}
      </table>
      </div>
      </div>
      </Layout>
  )
}

export default Statistic
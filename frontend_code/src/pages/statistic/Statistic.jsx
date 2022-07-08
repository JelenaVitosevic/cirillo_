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
      <table className={styles.table}>
        <tr className={styles.tableRows}>
          <th className={styles.tableRow}>name</th>
          <th className={styles.tableRow}>time</th>
          <th className={styles.tableRow}>status</th>
        </tr>
        {tasks.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.time}</td>
              <td>{val.status}</td>
            </tr>
          )
        })}
      </table>
      </div>
      </Layout>
  )
}

export default Statistic
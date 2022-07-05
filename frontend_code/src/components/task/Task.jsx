import React, { useContext } from 'react';
import { CirilloContext } from '../../context/CirilloContext';
import styles from './Task.module.css'
import {FaTimes, FaEdit} from 'react-icons/fa'

function Task({item}) {

    const {deleteTask, editTask} = useContext(CirilloContext);

  return (
    <div className={styles.taskWrapper}>
        <div className={styles.task}> {item} </div>
        <button onClick={() => deleteTask(item)} className={styles.button}>
            <FaTimes color='#b79492' className={styles.icon}/>
        </button>
        <button onClick={() => console.log('edit task works')} className={styles.button}>
            <FaEdit color='#b79492' className={styles.icon}/>
        </button>
    </div>
  )
}

export default Task
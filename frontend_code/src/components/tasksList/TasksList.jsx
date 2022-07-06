import React, { useContext } from 'react';
import { CirilloContext } from '../../context/CirilloContext';
import Task from '../task/Task'
import styles from './TasksList.module.css'


function TasksList() {

    const {tasks} = useContext(CirilloContext)

    if(!tasks || tasks.length === 0) {
        return <p className={styles.noText}>No Task yet</p>
    }

  return (
    <div className={styles.tasksList}>
            
           {tasks.map((item) => (  
             <Task key={tasks.indexOf(item)} item={item}/>   
             
               
           ) )}
           
        </div>
  )
}

export default TasksList
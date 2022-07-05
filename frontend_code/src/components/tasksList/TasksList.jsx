import React, { useContext } from 'react';
import { CirilloContext } from '../../context/CirilloContext';
import Task from '../task/Task'
import styles from './TasksList.module.css'


function TasksList() {

    const {task} = useContext(CirilloContext)

    if(!task || task.length === 0) {
        return <p className={styles.noText}>No Task yet</p>
    }

  return (
    <div className={styles.tasksList}>
            
           {task.map((item) => (  
             <Task key={task.indexOf(item)} item={item}/>   
             
               
           ) )}
           
        </div>
  )
}

export default TasksList
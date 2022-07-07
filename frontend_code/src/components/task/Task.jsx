import React, { useContext } from 'react';
import { CirilloContext } from '../../context/CirilloContext';
import styles from './Task.module.css'
import {FaTimes, FaEdit} from 'react-icons/fa'
import { useState } from 'react';

function Task({item}) {

    const {tasks, deleteTask, updateTask} = useContext(CirilloContext);

    const currentTask = tasks.find((task) => task.id === item.id)

    const [newTask, setNewTask] = useState(currentTask)
    const [showEditInput, setShowEditInput] = useState(false)

  return (
    <div className={styles.taskWrapper}>
        <div className={styles.task}> {item.name} </div>
        <button onClick={() => deleteTask(item.id)} className={styles.button}>
            <FaTimes color='#b79492' className={styles.icon}/>
        </button>
        <button onClick={() => setShowEditInput(true)} className={styles.button}>
            <FaEdit color='#b79492' className={styles.icon}/>
        </button>
        {showEditInput && (
          <>
            <input 
                type="text"
                className={styles.saveInput} 
                value={newTask?.name} 
                onChange={ (e) => setNewTask((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                  })) 
                } 
            />
            <button 
              className={styles.saveButton} 
              onClick={() => {
                updateTask(item.id, newTask)
                setShowEditInput(false)
              }
            }
            >
              save
            </button>
          </>
        )}
    </div>
  )
}

export default Task
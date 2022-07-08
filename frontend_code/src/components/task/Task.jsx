import React, { useContext } from 'react';
import { CirilloContext } from '../../context/CirilloContext';
import styles from './Task.module.css'
import {FaTimes, FaEdit, FaClock} from 'react-icons/fa'
import { useState } from 'react';

function Task({item}) {

    const {tasks, elapsedTime, pauseTimer, resetTimer, activeTask, deleteTask, updateTask, updateTimeTask, selectTask, ShowTask, showTaskName} = useContext(CirilloContext);

    const currentTask = tasks.find((task) => task.id === item.id)

    const [newTask, setNewTask] = useState(currentTask)
    const [showEditInput, setShowEditInput] = useState(false)
    const [showSelectedTask, setShowSelectedTask] = useState(false)

    let isLogedIn = localStorage.getItem('access token')


  return (
    <div className={styles.taskWrapper}>
       <button onClick={() => {
                    console.log('set task')
                    selectTask(item.name)
                    ShowTask()
                    setShowSelectedTask(true)
                }} className={styles.button}>
            <FaClock color='#b79492' className={styles.icon}> </FaClock>
        </button>
        {showSelectedTask && (
          <>
            <button onClick={() => {
              pauseTimer()
              //console.log('Proslo je' + elapsedTime + 'sekundi')
              updateTimeTask(item.id)
              resetTimer()
              }} >done</button>
          </>
        )}
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
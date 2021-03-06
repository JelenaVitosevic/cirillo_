import React from 'react';
import { CirilloContext } from '../../context/CirilloContext';
import { useState, useContext } from "react";
import styles from './TasksForm.module.css'

function Tasks() {
    
    const [text, setText] = useState('');

    const {
        newTaskValue,
        taskBackend,
        AddTask,
        taskEdit,
        updateTask
      } = useContext(CirilloContext)

    /*useEffect(() => {
        if(taskEdit.edit === true){
            setText(taskEdit.item.text)
        }
      }, [taskEdit])*/

      const handleTextChange = (e) => {
        setText(e.target.value)
        newTaskValue(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text) {
            AddTask(taskBackend)
            setText('')
        }
    }

    /*const handleSubmit = (e) => {
        e.preventDefault() 
        if(text) {
            const newTask = text
            if (taskEdit.edit === true) {
                updateTask(taskEdit.item.id, newTask)
            } else {
            addTask(newTask)
            }
 
            setText('')
        }
     }*/
    
  return (
    <div className={styles.taskContainer}>

        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter new task' className={styles.inputForm} value={text} onChange={handleTextChange}></input>
                <button className={styles.button} type="submit">+</button>
            </form>
        </div>

        <div className={styles.tasksWrapper}>
            <ul className={styles.taskList}></ul>
        </div>

    </div>
  )
}

export default Tasks
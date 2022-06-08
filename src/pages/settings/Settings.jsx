import React, { useContext } from 'react';
import styles from './Settings.module.css';
import Button from '../../components/buttons/Button';
import { CirilloContext } from '../../context/CirilloContext';

function Settings() {

  const {
    focus, 
    short, 
    long, 
    rounds,
    setTimerValues,
    consoleMyTimeValues 
  } = useContext(CirilloContext)

  function handleClick(e) {
    consoleMyTimeValues()
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
    <div className={styles.contentWrapper}>
      <form noValidate className={styles.form} onSubmit={handleClick}>
        <label htmlFor="focus" className={styles.label}>Focus Duration:</label>
        <input type="text" id='focus' name='focus'  className={styles.input} onChange={(e) => setTimerValues('focus', e.target.value)} defaultValue={focus}/>
        <label htmlFor="shortBreak"  className={styles.label}>Short Break Duration:</label>
        <input type="text" id='shortBreak' name='shortBreak' className={styles.input} onChange={(e) =>setTimerValues('shortBreak', e.target.value)} defaultValue={short}/>
        <label htmlFor="longBreak"  className={styles.label}>Long Break Duration:</label>
        <input type="text" id='longBreak' name='longBreak' className={styles.input} onChange={(e) =>setTimerValues('longBreak', e.target.value)} defaultValue={long}/>
        <label htmlFor="rounds"  className={styles.label}>Number of Rounds</label>
        <input type="text" id='rounds' name='rounds' className={styles.input} onChange={(e) =>setTimerValues('rounds', e.target.value)} defaultValue={rounds}/>
        <Button buttonStyle={'submit'} type='button'>save changes</Button>
      </form>
    </div>
    </div>
  )
}

export default Settings
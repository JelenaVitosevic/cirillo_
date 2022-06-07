import React, { useContext } from 'react';
import styles from './Settings.module.css';
import Button from '../../components/buttons/Button';
import { CirilloContext } from '../../context/CirilloContext';
/**import { SettingContext } from '../../context/SettingsContext';*/


function Settings() {

  const {
    focus, 
    short, 
    long, 
    rounds,
    setTimerValues,
    consoleMyTimeValues 
  } = useContext(CirilloContext)

  /*const [newTimer, setNewTimer] = useState ({
    focus: 0.3,
    shortBreak: 0.2,
    longBreak: 1,
    rounds: 4,
    active: 'focus'
  })

  const{ updateExecute } = useContext(SettingContext)

  function handleChange(input) {
    const {name, value} = input.target
    switch (name) {
      case 'focus':
        console.log(parseInt(value))
        setNewTimer({
          ...newTimer,
          focus: parseInt(value)
        })
        break;
      case 'shortBreak':
        setNewTimer({
          ...newTimer,
          shortBreak: parseInt(value)
        })
        break;
      case 'longBreak':
        setNewTimer({
          ...newTimer,
          longBreak: parseInt(value)
        })
        break;
      case 'rounds':
        setNewTimer({
          ...newTimer,
          rounds: parseInt(value)
        })
        break;
    
      default:
        break;
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(newTimer)
    updateExecute(newTimer)
  };*/

  function handleClick(e) {
    consoleMyTimeValues()
    e.preventDefault()
  }

 

  return (
    <div className={styles.container}>
    <div className={styles.contentWrapper}>
      <form noValidate className={styles.form}>
        <label htmlFor="focus" className={styles.label}>Focus Duration:</label>
        <input type="text" id='focus' name='focus'  className={styles.input} onChange={(e) => setTimerValues('focus', e.target.value)} defaultValue={focus}/>
        <label htmlFor="shortBreak"  className={styles.label}>Short Break Duration:</label>
        <input type="text" id='shortBreak' name='shortBreak' className={styles.input} onChange={(e) =>setTimerValues('shortBreak', e.target.value)} defaultValue={short}/>
        <label htmlFor="longBreak"  className={styles.label}>Long Break Duration:</label>
        <input type="text" id='longBreak' name='longBreak' className={styles.input} onChange={(e) =>setTimerValues('longBreak', e.target.value)} defaultValue={long}/>
        <label htmlFor="rounds"  className={styles.label}>Number of Rounds</label>
        <input type="text" id='rounds' name='rounds' className={styles.input} onChange={(e) =>setTimerValues('rounds', e.target.value)} defaultValue={rounds}/>
        <Button buttonStyle={'submit'} type='button' myFunction={handleClick}>save changes</Button>
      </form>
      
    </div>
    </div>
  )
}

export default Settings
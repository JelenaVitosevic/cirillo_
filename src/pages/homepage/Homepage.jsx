import React, { useContext, useEffect } from 'react';
import Button from '../../components/buttons/Button';

import Timer from '../../components/timer/Timer';
import { CirilloContext } from '../../context/CirilloContext';
//import { SettingContext } from '../../context/SettingsContext';
import styles from './Homepage.module.css';

function Homepage() {

  const { focus, short, long, consoleValue, children, timerPropValue, startAnimate, startTimer, pauseTimer } = useContext(CirilloContext)

  function handleClick(value) {
    pauseTimer()
    console.log(value)
    consoleValue(value)
  }
  
  /*const {
    pomodoro,
    executing,
    setCurrentTimer,
    startAnimate,
    startTimer,
    pauseTimer,
    children,
    updateExecute,
    settingButton,
  } = useContext(SettingContext)
console.log(settingButton)
  useEffect(() => {updateExecute(executing)}, [executing, startAnimate])*/

  return (
   
      <div className={styles.container}>
          <div className={styles.contentWrapper}>
        <Timer
          //key={pomodoro}
          timer={timerPropValue}//timer={pomodoro}
          animate={startAnimate}//animate={startAnimate}
        >{children}</Timer>
        <div className={styles.buttonWrapper}>
            <Button 
              buttonStyle={'primary'} 
              myFunction={startTimer}
              /*activeStyle={!startAnimate ? 'active' : undefined}
              _callback={startTimer}*/
              >start</Button>
            <Button 
              buttonStyle={'primary'}
              myFunction={pauseTimer}
              /*activeStyle={startAnimate ? 'active' : undefined}
              _callback={pauseTimer}*/
              >pause</Button>
          </div>
          <div className={styles.circleButtonWrapper}>
            <Button 
              buttonStyle={'secondary'}
              myFunction={() => handleClick(focus)}
              /*activeStyle={executing.active === 'focus' ? 'active' : undefined}
              _callback={() => setCurrentTimer('focus')}*/
              >focus</Button>
            <Button 
              buttonStyle={'secondary'}
              myFunction={() => handleClick(short)}
              /*activeStyle={executing.active === 'shortBreak' ? 'active' : undefined}
              _callback={() => setCurrentTimer('shortBreak')}*/
              >short break</Button>
            <Button 
              buttonStyle={'secondary'}
              myFunction={() => handleClick(long)}
              /*activeStyle={executing.active === 'longBreak' ? 'active' : undefined}
              _callback={() => setCurrentTimer('longBreak')}*/
              >long break</Button>
          </div>
          </div>
        </div>
        
          
      
      
  )
}

export default Homepage;
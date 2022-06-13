import React, { useContext } from 'react';
import Button from '../../components/buttons/Button';
import Timer from '../../components/timer/Timer';
import { CirilloContext } from '../../context/CirilloContext';
import styles from './Homepage.module.css';

function Homepage() {

  const {
    focus,
    short,
    long,
    activeTimerValue,
    timerType,
    timerText,
    roundText,
    isAnimate,
    startTimer,
    pauseTimer,
    resetTimer
  } = useContext(CirilloContext)

  function handleClick(value) {
    pauseTimer()
    console.log(value)
    activeTimerValue(value)
  }

  return (
   
      <div className={styles.container}>
          <div className={styles.contentWrapper}>
        <Timer
          timerKey={timerType}
          timer={timerType}
          animate={isAnimate}
          text1={timerText}
          text2={roundText}
        ></Timer>
        <div className={styles.buttonWrapper}>
            <Button 
              buttonStyle={'primary'} 
              myFunction={startTimer}
              >start</Button>
            <Button 
              buttonStyle={'primary'}
              myFunction={pauseTimer}
              >pause</Button>
              <Button 
              buttonStyle={'primary'} 
              myFunction={resetTimer}
              >reset</Button>
          </div>
          <div className={styles.circleButtonWrapper}>
            <Button 
              buttonStyle={'secondary'}
              myFunction={() => handleClick(focus)}
              >focus</Button>
            <Button 
              buttonStyle={'secondary'}
              myFunction={() => handleClick(short)}
              >short break</Button>
              
            <Button 
              buttonStyle={'secondary'}
              myFunction={() => handleClick(long)}
              >long break</Button>
          </div>
          </div>
        </div> 
  )
}

export default Homepage;
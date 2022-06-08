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
    timerPropValue,
    startAnimate,
    startTimer,
    pauseTimer
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
          timer={timerPropValue}
          animate={startAnimate}
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
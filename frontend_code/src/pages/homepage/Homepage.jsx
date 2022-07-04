import React, { useContext } from 'react';
import Button from '../../components/buttons/Button';
import Layout from '../../components/layout/Layout';
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

 let isLogedIn = localStorage.getItem('access token')

  return (
    <Layout>
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
                >
                  start
                </Button>
                <Button 
                  buttonStyle={'primary'}
                  myFunction={pauseTimer}
                >
                  pause
                </Button>
                <Button 
                  buttonStyle={'primary'} 
                  myFunction={resetTimer}
                >
                  reset
                </Button>
            </div>
            <div className={styles.circleButtonWrapper}>
                <Button 
                  buttonStyle={'secondary'}
                  myFunction={() => handleClick(focus)}
                >
                  focus
                </Button>
                <Button 
                  buttonStyle={'secondary'}
                  myFunction={() => handleClick(short)}
                >
                  short break
                </Button> 
                <Button 
                  buttonStyle={'secondary'}
                  myFunction={() => handleClick(long)}
                >
                  long break
                </Button>
            </div>

            {isLogedIn && 
              <div className={styles.formWrapper}>
                <form className={styles.form}>
                  <label>Add New Task:</label>
                  <input placeholder='Enter new task' className={styles.inputForm}></input>
                  <Button buttonStyle={'submit'} className={styles.button}>add task</Button>
                </form>
              </div>
            }

          </div>
      </div> 
    </Layout>
  )
}

export default Homepage;
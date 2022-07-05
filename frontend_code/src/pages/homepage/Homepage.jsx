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
            <>
              <div className={styles.taskContainer}>

                <div className={styles.formWrapper}>
                  <form className={styles.form}>
                    <input type="text" placeholder='Enter new task' className={styles.inputForm}></input>
                    <button className={styles.button} type="submit">+</button>
                  </form>
                </div>

                <div className={styles.filterWrapper}>
                  <select name='tasks' className={styles.filter}>
                    <option value="all">All</option>
                    <option value="new">New</option>
                    <option value="in progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className={styles.tasksWrapper}>
                  <ul className={styles.taskList}></ul>
                </div>

              </div>
            </>
            }

          </div>
      </div> 
    </Layout>
  )
}

export default Homepage;
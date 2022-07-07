import React, { useContext } from 'react';
import { useState } from 'react';
import Button from '../../components/buttons/Button';
import Layout from '../../components/layout/Layout';
import TasksForm from '../../components/tasksForm/TasksForm';
import TasksList from '../../components/tasksList/TasksList';
import Timer from '../../components/timer/Timer';
import { CirilloContext } from '../../context/CirilloContext';
import styles from './Homepage.module.css';
import { useCountdown } from 'react-countdown-circle-timer';

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
    resetTimer,
    activeTask,
    showTaskName
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
            <div className={styles.contentFirst}>
              
            <Timer
              timerKey={timerType}
              timer={timerType}
              animate={isAnimate}
              text1={timerText}
              text2={roundText}
            ></Timer>
            {showTaskName && (
                <>
                 <div>{activeTask.name}</div>
                </>
              )}


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
            </div>
            
            {isLogedIn && 
            <div className={styles.taskContainerWrapper}>
            <div className={styles.taskContainer}>
            <TasksForm/>
            <TasksList/>
            </div>
            </div>
            }
          </div>
      </div> 
    </Layout>
  )
}

export default Homepage;
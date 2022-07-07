import styles from './Timer.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { CirilloContext } from '../../context/CirilloContext';
import { useContext } from 'react';
import { useState } from 'react';

function Timer({timer, animate, timerKey, text1, text2}) {
    const {stopTimer} = useContext(CirilloContext)

    const[elapsedTime, setElapsedTime] = useState(0)

    function renderTime({remainingTime}) {
        let minutes = Math.floor(remainingTime/60)
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        let seconds = remainingTime % 60
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        return (
            <div className={styles.tiimerContent}>
                <div className={styles.text}>
                    {text1}
                </div>
                <div className={styles.time}>
                    {`${minutes}:${seconds}`}
                </div>
                <div className={styles.text}>
                    {text2}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.timerWrapper}>
            <CountdownCircleTimer
                key={timerKey}
                className={styles.timer}
                isPlaying = {animate}
                duration = {timer * 60}
                colors={[['#b79492'], ['#blue']]}
                strokeWidth={6}
                size={220}
                trailColor='#eee2df'
                onComplete={ () => {
                    stopTimer()
                    } 
                }
                onUpdate={(remainingTime) => {
                    setElapsedTime(timer * 60 - remainingTime)
                    console.log(elapsedTime, 'bla bla')
                  }}
            >
                {renderTime}
            </CountdownCircleTimer>
        </div>
    )
}

export default Timer;
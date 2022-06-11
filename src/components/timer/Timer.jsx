import styles from './Timer.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { CirilloContext } from '../../context/CirilloContext';
import { useContext } from 'react';

function Timer({timer, animate, timerKey}) {
    const {stopTimer} = useContext(CirilloContext)

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
            <div className={styles.time}>
                {`${minutes}:${seconds}`}
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
        >
            {renderTime}
        </CountdownCircleTimer>
        </div>
    )
}

export default Timer;
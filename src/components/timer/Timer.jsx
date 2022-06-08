import styles from './Timer.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { CirilloContext } from '../../context/CirilloContext';
import { useContext } from 'react';

function Timer({timer, animate}) {
    const {stopTimer} = useContext(CirilloContext)

    function renderTime({remainingTime}) {
        const minutes = Math.floor(remainingTime/60)
        const seconds = remainingTime % 60
        return (
            <div className={styles.time}>
                {`${minutes}:${seconds}`}
            </div>
        )
    }

    return (
        <div className={styles.timerWrapper}>
        <CountdownCircleTimer
        className={styles.timer}
        isPlaying = {animate}
        duration = {timer * 60}
        colors={[['#b79492'], ['#blue']]}
        strokeWidth={6}
        size={220}
        trailColor='#eee2df'
        onComplete={ () => {
            console.log('Time is over!')
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
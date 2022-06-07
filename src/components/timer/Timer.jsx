import styles from './Timer.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { CirilloContext } from '../../context/CirilloContext';
import { useContext } from 'react';
//import { SettingContext } from '../../context/SettingsContext';

function Timer({key, timer, animate, children}) {
    const {stopTimer} = useContext(CirilloContext)

    return (
        <div className={styles.timerWrapper}>
        <CountdownCircleTimer
        className={styles.timer}
        key={key}
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
            {children}
        </CountdownCircleTimer>
        </div>
    )
}

export default Timer;
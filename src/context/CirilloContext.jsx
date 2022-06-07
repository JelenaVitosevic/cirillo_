import React, { useState, createContext } from 'react';
export const CirilloContext = createContext()

function CirilloContextProvider(props) {
    const[focus, setFocus] = useState(25)
    const[short, setShort] = useState(5)
    const[long, setLong] = useState(15)
    const[rounds, setRounds] = useState(4)
    const[pomodoroTimer, setPomodoroTimer] = useState(0)
    const[startAnimate, setStartAnimate] = useState(false)
    const[timerPropValue, setTimerPropValue] = useState(focus)

    let myTimeValues = {
        focusTime: parseInt(focus),
        shortBreakTime: parseInt(short),
        longBreakTime: parseInt(long),
        numOfRounds: parseInt(rounds)
    }

    function startTimer() {
        setStartAnimate(true)
    }

    function pauseTimer() {
        setStartAnimate(false)
    }

    function stopTimer() {
        setStartAnimate(false)
    }

    function setTimerValues(timeValue, a) {

        if (timeValue === 'focus') {
            setFocus(a)
        }
        else if (timeValue === 'shortBreak') {
            setShort(a)
        }
        else if (timeValue === 'longBreak') {
            setLong(a)
        }
        else{
            setRounds(a)
        }
    }

    function consoleMyTimeValues() {
        console.log(myTimeValues)
        return myTimeValues
    }

    function consoleValue(value) {
        console.log(value)
        if (value === focus) {
            setTimerPropValue(focus)
        }
        else if (value === short) {
            setTimerPropValue(short)
        }
        else setTimerPropValue(long)
    }

    function children({remainingTime, timerStyle}) {
        const minutes = Math.floor(remainingTime/60)
        const seconds = remainingTime % 60
  
        return (
            <div>
                <div>{minutes}:{seconds}</div>
            </div>
        ) //`${minutes}:${seconds}`
    }
 
    return (
        <CirilloContext.Provider
        value={{
            focus,
            short,
            long,
            rounds,
            pomodoroTimer,
            startAnimate,
            myTimeValues,
            timerPropValue,
            startTimer,
            pauseTimer,
            stopTimer,
            setTimerValues,
            consoleMyTimeValues,
            consoleValue,
            children
            
        }}
        >
         {props.children}   
        </CirilloContext.Provider>
    )
}

export default CirilloContextProvider
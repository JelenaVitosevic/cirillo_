import React, { useState, createContext } from 'react';
export const CirilloContext = createContext()

function CirilloContextProvider(props) {
    const[focus, setFocus] = useState(25)
    const[short, setShort] = useState(5)
    const[long, setLong] = useState(15)
    const[rounds, setRounds] = useState(4)
    const[round, setRound] = useState(1)
    const[startAnimate, setStartAnimate] = useState(false)
    const[timerType, setTimerType] = useState(focus)
    
    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

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
        if (timerType === focus && round < rounds) {
            setStartAnimate(false)
            console.log('Focus time is over!')
            setTimerType(short)
            setStartAnimate(true)
        }
        else if (timerType === short && round < rounds) {
            setStartAnimate(false)
            console.log('Short break is done!')
            setTimerType(focus)
            setStartAnimate(true)
            setRound(round+1)
        }
        else if (timerType === focus && round >= rounds) {
            setStartAnimate(false)
            console.log('Last focus time is over!')
            setTimerType(long)
            setStartAnimate(true)
        }
        else {
            setStartAnimate(false)
            setRound(1)
            console.log('Work is done!')
        }
    }

    /*function stopTimer() {
        for (let i=1; i <= rounds; i++) 
        {
            console.log(timerType)
            if (timerType === focus && i < rounds) {
            setStartAnimate(false)
            console.log('Focus round is over!')
            setTimerType(short)
            setStartAnimate(true)
            
            }
            else if (timerType === focus && i === rounds) {
            setStartAnimate(false)
            console.log('Last focus round is over!')
            setTimerType(long)
            setStartAnimate(true)
            }
            else if (timerType === short) {
            setStartAnimate(false)
            console.log('Short round is over!')
            setTimerType(focus)
            setStartAnimate(true)
            }
            else {
                setStartAnimate(false)
                console.log('Your work is done!')
            }
            
        }
        
    }*/

    function buttonToHome() {
        setTimerType(focus)
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

    function activeTimerValue(value) {
        console.log(value)
        if (value === focus) {
            setTimerType(focus)
        }
        else if (value === short) {
            setTimerType(short)
        }
        else setTimerType(long)
    }

    function setNewUser(userData, a) {

        if (userData === 'firstName') {
            setUser({
                ...user,
                firstName: a
            })
        }
        else if (userData === 'lastName') {
            setUser({
                ...user,
                lastName: a
            })
        }
        else if (userData === 'email') {
            setUser({
                ...user,
                email: a
            })
        }
        else{
            setUser({
                ...user,
                password: a
            })
        }
    }

    function consoleNewUser() {
        console.log(user)
    }
 
    return (
        <CirilloContext.Provider
        value={{
            focus,
            short,
            long,
            rounds,
            round,
            startAnimate,
            myTimeValues,
            timerType,
            user,
            startTimer,
            pauseTimer,
            stopTimer,
            setTimerValues,
            consoleMyTimeValues,
            activeTimerValue,
            setNewUser,
            consoleNewUser,
            buttonToHome
        }}
        >
         {props.children}   
        </CirilloContext.Provider>
    )
}

export default CirilloContextProvider
import React, { useState, createContext } from 'react';
export const CirilloContext = createContext()

function CirilloContextProvider(props) {
    const[focus, setFocus] = useState(25)
    const[short, setShort] = useState(5)
    const[long, setLong] = useState(15)
    const[rounds, setRounds] = useState(4)
    const[startAnimate, setStartAnimate] = useState(false)
    const[timerPropValue, setTimerPropValue] = useState(focus)
    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        key: 0
    })
    const[users, setUsers] = useState([]);

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

    function activeTimerValue(value) {
        console.log(value)
        if (value === focus) {
            setTimerPropValue(focus)
        }
        else if (value === short) {
            setTimerPropValue(short)
        }
        else setTimerPropValue(long)
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
        setUser({
            ...user,
            key: user.key + 1
        })
        console.log(user)
        setUsers(users.push(user))
        console.log(users)
    }
 
    return (
        <CirilloContext.Provider
        value={{
            focus,
            short,
            long,
            rounds,
            startAnimate,
            myTimeValues,
            timerPropValue,
            user,
            startTimer,
            pauseTimer,
            stopTimer,
            setTimerValues,
            consoleMyTimeValues,
            activeTimerValue,
            setNewUser,
            consoleNewUser
        }}
        >
         {props.children}   
        </CirilloContext.Provider>
    )
}

export default CirilloContextProvider
import React, { useState, createContext } from 'react';
export const CirilloContext = createContext()

function CirilloContextProvider(props) {
    const[focus, setFocus] = useState(25)
    const[short, setShort] = useState(5)
    const[long, setLong] = useState(15)
    const[rounds, setRounds] = useState(4)  //number of rounds
    const[round, setRound] = useState(1)  //current round
    const[isAnimate, setIsAnimate] = useState(false)
    const[timerType, setTimerType] = useState(focus)
    const[timerText, setTimerText] = useState('focus time')
    const[roundText, setRoundText] = useState('round 1')
    
    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [message, setMessage] = useState('');


    let myTimeValues = {
        focusTime: parseInt(focus),
        shortBreakTime: parseInt(short),
        longBreakTime: parseInt(long),
        numOfRounds: parseInt(rounds)
    }

    function startTimer() {
        setIsAnimate(true)
    }

    function pauseTimer() {
        setIsAnimate(false)
    }

    function stopTimer() {
        if (timerType === focus && round < rounds) {
            setIsAnimate(false)
            console.log('Focus time is over!')
            setTimerType(short)
            setTimerText('short break')
            setIsAnimate(true)
        }
        else if (timerType === short && round < rounds) {
            setIsAnimate(false)
            console.log('Short break is done!')
            setTimerType(focus)
            setTimerText('focus time')
            setRoundText(`round ${round+1}`)
            setIsAnimate(true)
            setRound(round+1)
        }
        else if (timerType === focus && round >= rounds) {
            setIsAnimate(false)
            console.log('Last focus time is over!')
            setTimerType(long)
            setTimerText('long break')
            setIsAnimate(true)
        }
        else {
            setIsAnimate(false)
            setRound(1)
            setTimerText('work is done')
            setRoundText('')
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
        setRound(1)
        setRoundText('round 1')
        setTimerText('focus time')
        
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
            setTimerText('focus time')
        }
        else if (value === short) {
            setTimerType(short)
            setTimerText('short break')
        }
        else {
            setTimerType(long)
            setTimerText('long break')
    }}

    function checkEmail() {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let email = user.email
        if(pattern.test(email)) {
          return email && setMessage('')
        } else {
          setMessage("Email adress is not valid!")
        }
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
            checkEmail()
        }
        else{
            setUser({
                ...user,
                password: a
            })
        }
    }

    function Register() {
        if (message === "Email adress is not valid!") {
            setUser({})
            console.log('Failed refistration! Please try again!')
        }
        else {
            console.log(user)
            setUser({})
        }
    }
 
    return (
        <CirilloContext.Provider
        value={{
            focus,
            short,
            long,
            rounds,
            round,
            isAnimate,
            myTimeValues,
            timerType,
            user,
            message,
            timerText,
            roundText,
            startTimer,
            pauseTimer,
            stopTimer,
            setTimerValues,
            consoleMyTimeValues,
            activeTimerValue,
            setNewUser,
            Register,
            buttonToHome,
            checkEmail
        }}
        >
         {props.children}   
        </CirilloContext.Provider>
    )
}

export default CirilloContextProvider
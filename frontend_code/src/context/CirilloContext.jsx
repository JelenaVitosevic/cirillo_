import React, { useState, createContext } from 'react';
import axios from 'axios'
export const CirilloContext = createContext()

function CirilloContextProvider(props) {

    //timer informations:
    const[focus, setFocus] = useState(25)
    const[short, setShort] = useState(5)
    const[long, setLong] = useState(15)
    const[rounds, setRounds] = useState(4)  //number of rounds
    const[round, setRound] = useState(1)  //current round
    const[isAnimate, setIsAnimate] = useState(false)  //for start/pause timer
    const[timerType, setTimerType] = useState(focus)  //shows what timer value to display
    const[timerText, setTimerText] = useState('focus time')  //shows wich text to display in timer
    const[roundText, setRoundText] = useState('round 1')  //shows current round
    

    //users informations:
    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const[logUser, setLogUser] = useState({
        email: '',
        password: '',
    })
    const[emailMessage, setEmailMessage] = useState('');
    const[passwordMessage, setPasswordMessage] = useState('');


    //tasks information
    const [tasks, setTasks] = useState([])
    const [taskBackend, setTaskBackend] = useState({
        name: '',
        time: 0,
        status: 'new'
    })
    const[activeTask, setActiveTask] = useState({})
    const[showTaskName, setShowTaskName] = useState(true)
    const[time, setTime] = useState(0);
    const[elapsedTime, setElapsedTime] = useState(0)

    //
    function getElapsedTime(time) {
        setElapsedTime(time)
    }

    //set Task
    function newTaskValue(a) {
        setTaskBackend({
            ...taskBackend,
            name: a
        })
    }

    //setActiveTask
    function selectTask(name) {
        setActiveTask(tasks.find(task => {
            if (task.name === name) {
                return task
            }
        }))
    }

    //
    function ShowTask() {
        setShowTaskName(true)
    }

    //Update Task
     const updateTask = async (id, taskNew) => {
        try{const res = await axios.put(
            `http://localhost:5000/tasks/update/${id}`, taskNew,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('access token')}`
                }
            },
        )
        console.log(res.data)
        setTasks(tasks.map(task => {
            if (task.id === res.data.id) {
                return res.data
            }
            return task
        }))
       }
       catch(error) {
        console.log(error)
       }
     }

     //Delete Task
      const deleteTask = async (id) => {
        try{const res = await axios.delete(
            `http://localhost:5000/tasks/delete/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('access token')}`
                }
            },
        )
        if(res.data) {
            setTasks(tasks.filter((item) => item.id !== res.data.id))
        }
        }
        catch(error) {
            console.log(error)
        }
      }
          

    //Add task
    const AddTask = async () => {
        try{const res = await axios.post(
            'http://localhost:5000/tasks', taskBackend,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('access token')}`
                }
            },
        )
        console.log(res.data)
        setTasks(res.data.tasks)
        console.log(tasks)
        }
        catch(error) {
            console.log(error)
        }
    }
    
    //a function that is triggered when user types values in settings inputs, to change states for focus, short break, long break and rounds
    function changeTimerValues(timeValue, a) {
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

    //data to be send to backend when user submit settings form
    let myTimeValues = {
        focusTime: Number(focus),
        shortBreakTime: Number(short),
        longBreakTime: Number(long),
        numOfRounds: Number(rounds)
    }

    //a function that is triggered at the click of a form submit button, now it just do the console.log, but it is intended to send data to the backend
    function consoleMyTimeValues() {
        console.log(myTimeValues)
        return myTimeValues
    }

    //a timer start function, it's triggered on click on a start button on homepage
    function startTimer() {
        setIsAnimate(true)
    }

    //a timer pause function, it's triggered on click on a pause button on homepage
    function pauseTimer() {
        setIsAnimate(false)
    }

    //the main function in this code, allows the timer to work like a pomodoro principle, with as many rounds as the user sets 
    function stopTimer() {
        if (timerType === focus && round < rounds) {
            console.log('Focus time is over!')
            //setTime(time + myTimeValues.focusTime)
            setTimerType(short)
            setTimerText('short break')
        }
        else if (timerType === short && round < rounds) {
            console.log('Short break is done!')
            setTimerType(focus)
            setTimerText('focus time')
            setRoundText(`round ${round+1}`)
            setRound(round+1)
        }
        else if (timerType === focus && round >= rounds) {
            console.log('Last focus time is over!')
            //setTime(time + myTimeValues.focusTime)
            setTimerType(long)
            setTimerText('long break')
        }
        else {
            setIsAnimate(false)
            setRound(1)
            setTimerText('work is done')
            setRoundText('')
            console.log('Work is done! You work' + time + 'minutes')
            console.log(time)
        }
        
    }

    //some idea for writing previous function in a different way, but it is not working properly
    /*function stopTimer() {
        for (let i=1; i <= rounds; i++) 
        {
            console.log(timerType)
            if (timerType === focus && i < rounds) {
            setIsAnimate(false)
            console.log('Focus round is over!')
            setTimerType(short)
            setIsAnimate(true)
            }
            else if (timerType === focus && i === rounds) {
            setIsAnimate(false)
            console.log('Last focus round is over!')
            setTimerType(long)
            setIsAnimate(true)
            }
            else if (timerType === short) {
            setIsAnimate(false)
            console.log('Short round is over!')
            setTimerType(focus)
            setIsAnimate(true)
            }
            else {
                setIsAnimate(false)
                console.log('Your work is done!')
            }   
        }
    }*/

    //a timer reset function, it's triggered on click on a reset button on homepage
    function resetTimer() {
        setTimerType(focus)
        setRound(1)
        setRoundText('round 1')
        setTimerText('focus time') 
    }

    //a function whose purpose is to change the value of the timer to the selected one by clicking the round button on the home page
    //the problem that needs to be solved is how to align it with the pomodoro cycle
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

    //a function that checks if the email is valid
    function checkEmail() {
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let email = user.email
        if(pattern.test(email)) {
          return email && setEmailMessage('')
        } else {
          setEmailMessage("Email adress is not valid!")
        }
    }

    //a function that checks if the password is valid
    function checkPassword() {
        let pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/);
        let password = user.password
        if(pattern.test(password)) {
          return password && setPasswordMessage('')
        } else {
          setPasswordMessage("Password must contain minimum 8 characters - digits, uppercases and lowercases!")
        }
    }

    //a function that is triggered when user types values in register inputs, to change state for user object
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
            checkPassword()
        }
    }

    //a function that is triggered at the click of a register form submit button, now it just do the console.log, but it is intended to send data to the backend
    const Register = async (navigate) => {
        try{const res = await axios.post(
              'http://localhost:5000/register', user,
              {
                headers: {
                    'Content-Type': 'application/json',
                  },
              },
            )
        console.log(res.data)
        navigate("/login")
        }
        
        catch(error) {
        console.log(error)  
        }
            
        }

    //set logUser
    function setNewLogUser(userData, a) {
        if (userData === 'email') {
            setLogUser({
                ...logUser,
                email: a
            })
            checkEmail()
        }
        else {
            setLogUser({
                ...logUser,
                password: a
            })
            checkPassword()
        }
    }

    //login function
    const Login = async (navigate) => {
        try{const res = await axios.post(
              'http://localhost:5000/login', logUser,
              {
                headers: {
                    'Content-Type': 'application/json',
                  },
              },
                
            )
        console.log(res.data)
        localStorage.setItem('access token', res.data.accessToken)
        navigate("/")}
        
        catch(error) {
        console.log(error)  
        }
    }


    //logout function
    function LogOut(navigate) {
        localStorage.removeItem('access token')
        navigate("/")
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
            timerText,
            roundText,
            user,
            logUser,
            emailMessage,
            passwordMessage,
            tasks,
            taskBackend,
            activeTask,
            showTaskName,
            time,
            elapsedTime,
            ShowTask,
            newTaskValue,
            startTimer,
            pauseTimer,
            stopTimer,
            resetTimer,
            changeTimerValues,
            consoleMyTimeValues,
            activeTimerValue,
            setNewUser,
            setNewLogUser,
            Register,
            Login,
            LogOut,
            checkEmail,
            checkPassword,
            updateTask,
            deleteTask,
            AddTask,
            selectTask,
            getElapsedTime
        }}
        >
         {props.children}   
        </CirilloContext.Provider>
    )
}

export default CirilloContextProvider
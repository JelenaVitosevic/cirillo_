//Do not use this, only for study, like an example

import React, { useState } from 'react'
import { createContext } from 'react'

export const SettingContext = createContext()

function SettingsContextProvider(props) {
  const[pomodoro, setPomodoro] = useState(0)
  const[executing, setExecuting] = useState({})
  const[startAnimate, setStartAnimate] = useState(false)

  function startTimer() {
      setStartAnimate(true);
  }

  function pauseTimer() {
      setStartAnimate(false);
  }

  function stopTimer() {
      setStartAnimate(false);
  }

  function settingButton() {
      setExecuting({})
      setPomodoro(0)
  }

  function setCurrentTimer(active_state) {
    updateExecute({
        ...executing,
        active: active_state
    })
    setTimerTime(executing)
}

  function updateExecute(updatedSettings) {
      setExecuting(updatedSettings);
      setTimerTime(updatedSettings)
  }

  function setTimerTime(evaluate) {
      switch (evaluate.active) {
          case 'focus':
              setPomodoro(evaluate.focus)
              break;
          case 'shortBreak':
              setPomodoro(evaluate.shortBreak)
              break;
          case 'longBreak':
              setPomodoro(evaluate.longBreak)
              break;
      
          default:
              setPomodoro(0)
              break;
      }
  }

  function children({remainingTime}) {
      const minutes = Math.floor(remainingTime/60)
      const seconds = remainingTime % 60

      return `${minutes}:${seconds}`
  }


  return (
    <SettingContext.Provider 
    value={{
        stopTimer, 
        updateExecute,
        pomodoro,
        executing,
        startAnimate,
        startTimer,
        pauseTimer,
        settingButton,
        setCurrentTimer,
        children
        }}>
        {props.children}
    </SettingContext.Provider>
  )
}

export default SettingsContextProvider
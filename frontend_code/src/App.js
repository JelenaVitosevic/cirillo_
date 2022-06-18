import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import Homepage from './pages/homepage/Homepage';
import LogIn from './pages/login/LogIn';
import Settings from './pages/settings/Settings';
import Statistic from './pages/statistic/Statistic';
import ErrorPage from './pages/error/ErrorPage';
import Register from './pages/register/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/statistic' element={<Statistic/>}></Route>
        <Route path='/settings' element={<Settings/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
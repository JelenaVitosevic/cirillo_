import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import Homepage from './pages/homepage/Homepage';
import LogIn from './pages/login/LogIn';
import Settings from './pages/settings/Settings';
import Statistic from './pages/statistic/Statistic';
import ErrorPage from './pages/error/ErrorPage';
import Register from './pages/register/Register';
import Logout from './pages/logout/Logout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        
          {/* public routes */}
          <Route path='/' element={<Homepage/>} />
          <Route path='/login' element={<LogIn/>}></Route>
          <Route path='/settings' element={<Settings/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          
          {/* protected routes for login users */}
          <Route element={<ProtectedRoute/>}>
            <Route path='/statistic' element={<Statistic/>}></Route>
            <Route path='/logout' element={<Logout/>}></Route>
          </Route>

          {/* catch all */}
          <Route path='*' element={<ErrorPage/>}></Route>

      </Routes>
    </Router>
  )
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import CirilloContextProvider from './context/CirilloContext.jsx';
//import SettingsContextProvider from './context/SettingsContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CirilloContextProvider>
    <App />
  </CirilloContextProvider>
);

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup'
import ToggleColorMode from './components/ToggleColorMode'
import Views from './components/Views'
import UserContext from './components/AccountContext'

function App() {
  return (
    <UserContext>
    <Views/>
    <ToggleColorMode/>
    </UserContext>
  )
}

export default App

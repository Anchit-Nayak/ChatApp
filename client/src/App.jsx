import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup'
import ToggleColorMode from './components/ToggleColorMode'
import Views from './components/Views'

function App() {
  return (
    // <Routes>
    //   <Route path='/' element={<Login/>}/>
    //   <Route path='/signup' element={<Signup/>}/>
    //   <Route path='*' element={<Login/>}/>
    // </Routes>
    <>
    <Views/>
    <ToggleColorMode/>
    </>
  )
}

export default App

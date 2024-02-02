import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const Views = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='*' element={<Login/>}/>
    </Routes>
  )
}

export default Views
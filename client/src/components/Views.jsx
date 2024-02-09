import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { Text } from '@chakra-ui/react'
import PrivateRoutes from './PrivateRoutes'
import { AccountContext } from './AccountContext'
import Home from '../pages/Home';

const Views = () => {
  const {user} = useContext(AccountContext);
  return user.loggedIn === null ? <Text>Loading...</Text>: 
    <Routes> 
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route element={<PrivateRoutes/>}>
         <Route path='/home' element={<Home/>}/>
      </Route>
      <Route path='*' element={<Login/>}/>
    </Routes>
}

export default Views
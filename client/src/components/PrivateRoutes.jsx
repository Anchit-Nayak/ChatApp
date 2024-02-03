import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import { AccountContext } from './AccountContext';
const useAuth = () =>{
    const {user} = React.useContext(AccountContext);
    return user && user.loggedIn;
}

const PrivateRoutes = () =>{
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to='/' />
}

export default PrivateRoutes;
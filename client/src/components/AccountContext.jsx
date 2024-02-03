import { createContext, useEffect } from 'react';
import React from 'react';
export const AccountContext = createContext();
import { useNavigate } from 'react-router-dom';

const UserContext = ({ children }) => {
    const [user, setUser] = React.useState({loggedIn: null});
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:3000/auth/login", {
            credentials: "include",
        }).catch(err => {
            setUser({loggedIn: false})
            return;
        })
        .then(res => {
            if(!res || !res.ok || res.status >= 400) {
                setUser({loggedIn: false})
                return;
            }
            return res.json()
        }).then((data) => {
            if(!data){
                setUser({loggedIn: false})
                return;
            }
            navigate("/home")
            setUser({...data})
        })
    }, []);
    return <AccountContext.Provider value={{user, setUser}}>
        {children}
        </AccountContext.Provider>
}

export default UserContext;
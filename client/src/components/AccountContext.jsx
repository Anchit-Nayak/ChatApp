import { createContext } from 'react';
import React from 'react';
export const AccountContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = React.useState({loggedIn: null});
    return <AccountContext.Provider value={{user, setUser}}>
        {children}
        </AccountContext.Provider>
}

export default UserContext;

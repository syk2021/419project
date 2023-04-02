import { useState, useEffect } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <UserContext.Provider
        value={{
            user,
            setUser,
            token,
            setToken,
            authenticated,
            setAuthenticated,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const withUserContext = ChildComponent => props => (
    <UserContext.Consumer>
        {
            context => <ChildComponent {...props} global={context}/>
        }
    </UserContext.Consumer>
)
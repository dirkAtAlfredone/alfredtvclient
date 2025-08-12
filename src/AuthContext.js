import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);

    const login = (userId) => {
        
    };

    const logout = () => {
        setUser(null);
    };

    const isLoggedIn = () => {
        return !!user;
    };

    return (
    <AuthContext.Provider value={{user, login, logout, setUser}}>
        {
            children
        }
    </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
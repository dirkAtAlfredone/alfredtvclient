import axios from "axios";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const URL = process.env.REACT_APP_URL;

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [init, setInit] = useState(false);
    const navigate = useNavigate();
    const timeOutId = useRef(null);

    const login = async (userId) => {
        try {
            const response = await axios.post(`${URL}/user`, {id: userId});
            if (response.status === 200) {
                setUser(response.data.user);
                localStorage.setItem("token", response.data.token);
                const tId = setInterval(async () => {
                    console.log("Revalidating...");
                    
                }, (response.data.timeLeft * 1000));
                timeOutId.current = tId;
                navigate("/");
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    const isLoggedIn = () => {

    };

    const validate = async () => {
    };

    useEffect(() => {

        (async () => {
            await validate();
        })();

        if (!init) {
            setInit(true);
        }
    });

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {
                children
            }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
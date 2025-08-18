import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const URL = process.env.REACT_APP_URL;

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [init, setInit] = useState(false);
    const navigate = useNavigate();

    const login = async (userId) => {
        try {

            const response = await axios.get(`${URL}/user/${userId}`);
            if (response.status === 200) {
                setUser(response.data.user);
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        return !!token;
    };

    useEffect(() => {
        let timeOutId = null;
        const verify = async () => {
            if(timeOutId){
                clearTimeout(timeOutId);
            }
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const headers = {
                        "Authorization": `Bearer ${token}`
                    };
                    const response = await axios.get(`${URL}/token/validate`, { headers });
                    if (response.status === 202) {
                        localStorage.setItem("token", response.data.token);
                        const timeLeft = response.data.timeLeft;
                        timeOutId = setTimeout(async () => {
                        timeOutId = await verify();
                        }, ((timeLeft * 1000) + 5000));
                    }
                    else{
                        throw new Error("Unauthorized");
                    }
                }
                catch (e) {
                    localStorage.removeItem("token");
                }
            }
        }

        
            if (!init) {
                (async () => {
                await verify();
                })();

                setInit(true);
            }

        return () => {
            if(timeOutId){
                clearTimeout(timeOutId);
            }
        }
    }, []);

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
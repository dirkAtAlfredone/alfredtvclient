import axios from "axios";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackdropLoader from "./components/BackdropLoader";

const AuthContext = createContext(null);

const URL = process.env.REACT_APP_URL;

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [init, setInit] = useState(false);
    const navigate = useNavigate();
    const timeOutId = useRef(null);

    const login = async (userId) => {

        const deviceId = crypto.randomUUID();

        try {
            const response = await axios.post(`${URL}/user`, {id: userId, deviceId});
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("deviceId", deviceId);
                validate();
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
        return !!user;
    };

    const validate = async () => {
        if(!!timeOutId.current){
            clearTimeout(timeOutId.current);
        }
        const token = localStorage.getItem("token");
        if(!!token){
            const headers = {
                Authorization: `Bearer ${token}`
            };
            try{
                const response = await axios.get(`${URL}/token/validate`, {headers});
                if(response.status === 200){
                    setUser(response.data.user);
                    if(token !== response.data.token){
                        localStorage.setItem("token", token);
                    }
                    if(!!timeOutId){
                        clearTimeout(timeOutId.current);
                    }
                    timeOutId.current = setTimeout(validate, response.data.timeLeft * 1000);
                    navigate("/");
                }
            } catch(e){
                setUser(null);
                localStorage.removeItem("token");
                navigate("/authenticate");
            }
        }
    };

    useEffect(() => {

        if (!init) {
            (async () => {
                await validate();
            })();
            setInit(true);
        }
    }, [init]);

    if(!init){
        return <BackdropLoader open={true} />
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser, init }}>
            {
                children
            }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
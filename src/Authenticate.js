import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import styles from "./css/authenticate.module.css";
import logo from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import BackdropLoader from "./components/BackdropLoader";

export default function Authenticate(){

    const {login} = useAuth();
    const [init, setInit] = useState(false);
    const navigate = useNavigate();

    const onIdSubmit = async (e) => {
        e.preventDefault();
        const userId = e.target["userId"].value;
        login(userId);
    };

    useEffect(() => {
        if(!init){
            const token = localStorage.getItem("token");
            if(token){
                navigate("/");
            }
            setInit(true);
        }
    });

    if(init){
        return (
            <main className={styles["authenticate"]}>
                <form className={styles["form"]} onSubmit={onIdSubmit}>
                    <img src={logo} className={styles["logo"]} />
                    <label className={styles["label"]} htmlFor="userId">User ID: </label>
                    <input className={styles["text"]} id="userId" type="text" />
                    <button className={styles["submit"]}>Submit</button>
                </form>
            </main>
        );
    } else {
        return <BackdropLoader open={true} />
    }
    
}
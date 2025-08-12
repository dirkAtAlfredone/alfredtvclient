import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styles from "./css/authenticate.module.css";
import axios from "axios";
import logo from "./images/logo.png";

const URL = process.env.REACT_APP_URL;

export default function Authenticate(){

    const {setUser} = useAuth();
    const navigate = useNavigate();

    const onIdSubmit = async (e) => {
        e.preventDefault();
        try{
            
            const response = await axios.get(`${URL}/user/${e.target["userId"].value}`);
            if(response.status === 200){
                setUser(response.data)
                navigate("/");
            }
        }
        catch(e){
            console.error(e);
        }
    };

    return (
        <main className={styles["authenticate"]}>
            <form className={styles["form"]} onSubmit={onIdSubmit}>
                <img src={logo} className={styles["logo"]} />
                <label className={styles["label"]} htmlFor="userId">User ID: </label>
                <input className={styles["text"]} id="userId" type="text"/>
                <button className={styles["submit"]}>Submit</button>
            </form>
        </main>
    );
}
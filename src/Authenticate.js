import { useAuth } from "./AuthContext";
import styles from "./css/authenticate.module.css";
import logo from "./images/logo.png";

export default function Authenticate(){

    const {login} = useAuth();

    const onIdSubmit = async (e) => {
        e.preventDefault();
        const userId = e.target["userId"].value;
        login(userId);
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
import styles from "./css/authenticate.module.css";

export default function Authenticate(){

    const onIdSubmit = () => {

    };

    return (
        <main className={styles["authenticate"]}>
            <h1 className={styles["title"]}>Alfred TV</h1>
            <form className={styles["form"]} onSubmit={onIdSubmit}>
                <label className={styles["label"]} htmlFor="userId">User ID: </label>
                <input className={styles["text"]} id="userId" type="text"/>
                <button className={styles["submit"]}>Submit</button>
            </form>
        </main>
    );
}
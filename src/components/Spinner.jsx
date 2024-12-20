import styles from "./Spinner.module.css";

const Spinner = () => (
    <div className={styles.spinner}>
        <div className={styles.rect1}></div>
        <div className={styles.rect2}></div>
        <div className={styles.rect3}></div>
        <div className={styles.rect4}></div>
    </div>
);

export default Spinner;

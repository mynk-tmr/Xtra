import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ dotSize, color, speed }) => {
  return (
    <div
      className={styles.container}
      style={{
        "--uib-size": dotSize ?? "40px",
        "--uib-color": color ?? "black",
        "--uib-speed": speed ?? "1.5s",
      }}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default LoadingSpinner;

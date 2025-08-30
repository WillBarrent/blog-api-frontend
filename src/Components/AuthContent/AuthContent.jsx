import styles from "./AuthContent.module.css";

function AuthContent() {
  return (
    <div className={styles.authContent}>
      <h1 className={styles.authContentLogo}>DEV</h1>
      <div className={styles.authContentTitle}>Join the DEV Community</div>
    </div>
  );
}

export default AuthContent;

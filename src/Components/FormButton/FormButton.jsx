import styles from "./FormButton.module.css";

function FormButton({ buttonText }) {
  return <button className={styles.formButton}>{buttonText}</button>;
}

export default FormButton;

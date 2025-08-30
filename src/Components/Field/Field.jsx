import styles from "./Field.module.css";

function Field({ name }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={`field-${name}`}>{name}</label>
      <input className={styles.fieldInput} type="text" id={`field-${name}`} />
    </div>
  );
}

export default Field;

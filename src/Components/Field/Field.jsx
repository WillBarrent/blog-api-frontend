import styles from "./Field.module.css";

function Field({ name, handleChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={`field-${name}`}>
        {name}
      </label>
      <input
        className={styles.fieldInput}
        type={name === "Password" ? "password" : "text"}
        id={`field-${name}`}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default Field;

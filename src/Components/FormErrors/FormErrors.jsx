import { TriangleAlert } from "lucide-react";
import styles from "./FormErrors.module.css";

function FormErrors({ path, errors = [] }) {
  return errors.length !== 0 ? (
    errors.map((error) => {
      if (error.path === path) {
        return (
          <div className={styles.formErrors}>
            <div className={styles.formErrorsItem}>
              <TriangleAlert color="red" size={18} />
              <div className={styles.formErrorText}>{error.msg}</div>
            </div>
          </div>
        );
      } else {
        return <></>;
      }
    })
  ) : (
    <></>
  );
}

export default FormErrors;

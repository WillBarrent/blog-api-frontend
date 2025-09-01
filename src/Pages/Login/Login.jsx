import AuthContent from "../../Components/AuthContent/AuthContent";
import Field from "../../Components/Field/Field";
import FormButton from "../../Components/FormButton/FormButton";

import styles from "./Login.module.css";


function Login() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.login}>
        <AuthContent />
        <form className={styles.loginForm} action="">
          <Field name="Email" />
          <Field name="Username" />
          <Field name="Password" />
          <FormButton buttonText="Login" />
          <div className={styles.loginLinkToSignUp}>
            Don't have an account?
            <a href="" className={styles.loginLinkToSignUp}>
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

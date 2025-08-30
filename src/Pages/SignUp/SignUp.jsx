import AuthContent from "../../Components/AuthContent/AuthContent";
import Field from "../../Components/Field/Field";
import FormButton from "../../Components/FormButton/FormButton";
import styles from "./SignUp.module.css";

function SignUp() {
  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.signUp}>
        <AuthContent />
        <form className={styles.signUpForm} action="">
          <Field name="Email" />
          <Field name="Username" />
          <Field name="Password" />
          <FormButton buttonText="Sign Up" />
          <div className={styles.signUpLinkToLogin}>
            Already Have an Account?
            <a href="" className={styles.signUpLinkToLogin}>
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

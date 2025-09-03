import { useEffect, useState } from "react";
import AuthContent from "../../Components/AuthContent/AuthContent";
import Field from "../../Components/Field/Field";
import FormButton from "../../Components/FormButton/FormButton";
import styles from "./SignUp.module.css";
import { data, Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  async function signUpUser() {
    await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    navigate("/login");
  }

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.signUp}>
        <AuthContent />
        <form className={styles.signUpForm} action={signUpUser}>
          <Field name="Email" handleChange={setEmail} />
          <Field name="Username" handleChange={setUsername} />
          <Field name="Password" handleChange={setPassword} />
          <FormButton buttonText="Sign Up" />
          <div className={styles.signUpLinkToLogin}>
            Already Have an Account?
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

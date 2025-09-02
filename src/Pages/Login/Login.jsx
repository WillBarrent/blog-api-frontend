import { useState } from "react";
import AuthContent from "../../Components/AuthContent/AuthContent";
import Field from "../../Components/Field/Field";
import FormButton from "../../Components/FormButton/FormButton";

import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const user = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const token = (await user.json()).token;

    localStorage.setItem("token", `Bearer ${token}`);
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.login}>
        <AuthContent />
        <form className={styles.loginForm} action={login}>
          <Field name="Email" handleChange={setEmail}/>
          <Field name="Username" handleChange={setUsername}/>
          <Field name="Password" handleChange={setPassword}/>
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

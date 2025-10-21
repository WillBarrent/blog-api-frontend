import { useEffect, useState } from "react";
import AuthContent from "../../Components/AuthContent/AuthContent";
import Field from "../../Components/Field/Field";
import FormButton from "../../Components/FormButton/FormButton";

import styles from "./Login.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import FormErrors from "../../Components/FormErrors/FormErrors";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  async function login() {
    const user = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await user.json();

    if (!data.errors) {
      const token = "Bearer " + data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

      navigate("/");
    } else {
      setErrors(data.errors);
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.login}>
        <AuthContent />
        <form className={styles.loginForm} action={login}>
          <Field name="Email" handleChange={setEmail} />
          <Field name="Username" handleChange={setUsername} />
          <FormErrors path="username" errors={errors} />
          <Field name="Password" handleChange={setPassword} />
          <FormErrors path="password" errors={errors} />
          <FormButton buttonText="Login" />
          <div className={styles.loginLinkToSignUp}>
            Don't have an account?
            <Link to="/sign-up">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

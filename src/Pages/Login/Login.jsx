import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthContent from "../../Components/AuthContent/AuthContent";
import AuthField from "../../Components/AuthField/AuthField";
import FormButton from "../../Components/FormButton/FormButton";
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
          <AuthField name="Email" handleChange={setEmail} />
          <AuthField name="Username" handleChange={setUsername} />
          <FormErrors path="username" errors={errors} />
          <AuthField name="Password" handleChange={setPassword} />
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

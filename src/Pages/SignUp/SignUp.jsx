import { useEffect, useState } from "react";
import AuthContent from "../../Components/AuthContent/AuthContent";
import Field from "../../Components/Field/Field";
import FormButton from "../../Components/FormButton/FormButton";
import styles from "./SignUp.module.css";
import { data, Link, useNavigate } from "react-router-dom";
import FormErrors from "../../Components/FormErrors/FormErrors";

function SignUp() {
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

  async function signUpUser() {
    const signUpData = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const signUpDataResult = await signUpData.json();

    if (!signUpDataResult.errors) {
      navigate("/login");
    } else {
      console.log(signUpDataResult.errors);
      setErrors(signUpDataResult.errors);
    }
  }

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.signUp}>
        <AuthContent />
        <form className={styles.signUpForm} action={signUpUser}>
          <Field name="Email" handleChange={setEmail} />
          <FormErrors path="email" errors={errors}/>
          <Field name="Username" handleChange={setUsername} />
          <FormErrors path="username" errors={errors}/>
          <Field name="Password" handleChange={setPassword} />
          <FormErrors path="password" errors={errors}/>
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

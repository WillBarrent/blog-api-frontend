import styles from "./Header.module.css";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const isUserLoggedIn = localStorage.getItem("token");
  const [openButton, setOpenButton] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>DEV</div>
        {isUserLoggedIn ? (
          <div className={styles.headerProfile}>
            <button
              onClick={() => {
                setOpenButton(!openButton);
              }}
              className={styles.headerProfileButton}
            >
              Profile
            </button>
            {openButton ? (
              <div className={styles.headerProfileBar}>
                <div className={styles.headerProfileBarInfo}>
                  <div className={styles.headerProfileBarUsername}>
                    Will Barrent
                  </div>
                  <div className={styles.headerProfileBarEmail}>
                    barrent@gmail.com
                  </div>
                </div>
                <div className={styles.headerProfileBarItem}>
                  <Link to={"http://localhost:3333/"}>Dashboard</Link>
                </div>
                <div className={styles.headerProfileBarItem}>
                  <Link to={"/log-out"}>Log Out</Link>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className={styles.headerAuth}>
            <Link to={"/login"} className={styles.headerLoginLink}>Login</Link>
            <Link to={"/sign-up"} className={styles.headerSignUpLink}>Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

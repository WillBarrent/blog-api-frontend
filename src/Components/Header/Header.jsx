import styles from "./Header.module.css";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const isUserLoggedIn = localStorage.getItem("token");

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>DEV</div>
        <button className={styles.headerProfile}>Profile</button>
      </div>
    </header>
  );
}

export default Header;

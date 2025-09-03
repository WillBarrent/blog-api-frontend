import styles from "./Header.module.css";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentPrimary}>
          <h1 className={styles.headerLogo}>
            <Link className={styles.headerLinkToMainPage} to="/"><div>DEV</div></Link>
          </h1>
          <div className={styles.headerSearchBar}>
            <Search className={styles.headerSearchBarBtn} size={40} />
            <input
              type="text"
              placeholder="Search..."
              className={styles.headerSearchBarInput}
            />
          </div>
        </div>
        <div className={styles.headerProfile}>
          <div className={styles.headerLogin}><Link className={styles.headerLoginLink} to="/login">Login</Link></div>
          <div className={styles.headerSignUp}><Link className={styles.headerSignUpLink} to="/sign-up">Create Account</Link></div>
        </div>
      </div>
    </header>
  );
}

export default Header;

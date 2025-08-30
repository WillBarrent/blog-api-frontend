import styles from "./Header.module.css";
import { Search } from "lucide-react";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentPrimary}>
          <h1 className={styles.headerLogo}>
            <div>DEV</div>
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
          <div className={styles.headerLogin}>Login</div>
          <div className={styles.headerSignUp}>Create Account</div>
        </div>
      </div>
    </header>
  );
}

export default Header;

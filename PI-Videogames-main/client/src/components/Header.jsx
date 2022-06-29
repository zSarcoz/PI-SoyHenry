import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <Link className={styles.titleLogo} to="/home">
            <li className={styles.liLogo}>GAMES</li>
          </Link>
          {/* <li>Contact</li>
          <li>About</li>
          <li>Sign up</li> */}
          <li className={styles.search}>
            <SearchBar/>
          </li>
        </ul>
      </nav>
    </header>
  );
}

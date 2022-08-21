import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "./styles/Header.module.css";
import imgProfile from "./styles/Profile.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <Link className={styles.titleLogo} to="/home">
            <li className={styles.liLogo}>GAMES</li>
          </Link>
          <li className={styles.search}>
            <SearchBar/>
          </li>
          <li className={styles.liLogo}>
              <Link to="/profile">
                <img
                  className={styles.imgProfile}
                  src={
                    imgProfile
                  }
                  alt="Profile"
                />
              </Link>
            </li>
        </ul>
      </nav>
    </header>
  );
}

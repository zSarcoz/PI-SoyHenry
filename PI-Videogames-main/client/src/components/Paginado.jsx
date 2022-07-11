import React from "react";
import styles from "./styles/Paginado.module.css";

export default function Paginado({
  gamesPerPage, 
  allGames,
  paginate,
  currentPage,
}) {
  const numPages = [];

  for (let i = 1; i <= Math.ceil(allGames.length / gamesPerPage); i++) {
    numPages.push(i);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {numPages &&
          numPages.map((num) => (
            <li className={styles.number} key={num}>
              <button
                className={currentPage === num ? styles.numberBtn : styles.btn}
                onClick={() => paginate(num)}
              >
                {num}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

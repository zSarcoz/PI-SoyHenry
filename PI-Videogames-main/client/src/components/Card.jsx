import React from "react";
import styles from "./styles/Card.module.css";

export default function Card({ name,image,genres }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt="Card" />
      <div className={styles.cardInfo}>
        <h2>{name}</h2>
        <p>{genres}</p>
      </div>
    </div>
  );
}
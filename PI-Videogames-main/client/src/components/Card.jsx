import React from "react";
import styles from "./styles/Card.module.css";

export default function Card({ name,image,genres,platforms,rating }) {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={image} alt="Card" />
      <div className={styles.cardInfo}>
        <h2 className={styles.title}>{name}</h2>
        {/* <h4 className={styles.genres}>Genres: {genres}.</h4> */}
        <h4 className={styles.genres}>Genres: {genres.join(", ")}.</h4>
        {/* <h5 className={styles.platforms}>Platforms: {platforms.join(", ")}.</h5>
        <h5 className={styles.rating}>Rating: {rating}</h5> */}
      </div>
    </div>
  );
}
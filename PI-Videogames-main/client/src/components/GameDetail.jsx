import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameById, getClean } from "../actions";
import Header from "./Header";
import Loading from "./Loading";
import styles from "./styles/GameDetail.module.css";

export default function GameDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const game = useSelector((state) => state.detail);
  console.log(game);

  useEffect(() => {
    dispatch(getGameById(id));
    dispatch(getClean());
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <Link to="/home">
        <button className={styles.button}>Back to Home</button>
      </Link>

      {game.id ? (
        <>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={game.image}
              alt="Videogame Img"
            />
            <h2 className={styles.gameName}>{game.name}</h2>
            <div className={styles.gameDescription}>
              Description: {game.description}
            </div>
            <div className={styles.genres}>Genres:</div>
            <div className={styles.gameDetail}>
              {game.genres.map((genre) => (
                // console.log(game.genres),
                <p className={styles.gameGenre}>{genre}</p>
              ))}
            </div>

            <div className={styles.gameDetail}>Rating: {game.rating}</div>
            <div className={styles.gameDetail}>
              Platforms: {game.platforms.join(", ")}
            </div>
            <div className={styles.gameDetail}>
              Release Date: {game.release_date}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.loading}>
            <Loading />
          </div>
        </>
      )}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGenres } from "../actions";
import style from "./styles/LandingPage.module.css";
import callOfDuty from "../images/callOfDuty.jpg";
import Header from "./Header";

export default function LandingPage() {
  const dispatch = useDispatch();
  const handlePostGenres = () => {
    dispatch(setGenres());
  };

  return (
    <div className={style.divLanding}>
      <div className={style.divContrast}>
        <div className={style.Header}>
          <Header />
        </div>
        <div className={style.img}>
          <figure className={style.figure}>
            <img className={style.img1} src={callOfDuty} alt="" />
            <figcaption className={style.figcaption}>Coming Soon!</figcaption>
          </figure>
        </div>
        <div className={style.container}>
          <h1 className={style.titleLanding}>VideoGames</h1>
          <p className={style.textLanding1}>
            Search your favorite games here or post yours!
          </p>
          <p className={style.textLanding2}>
            This page is a project, made by myself for soyHenry bootcamp,{" "}
            <br></br>if you want to see the page please go to click in the
            button below
          </p>
          <Link to="/home">
            <button className={style.button} onClick={handlePostGenres()}>
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

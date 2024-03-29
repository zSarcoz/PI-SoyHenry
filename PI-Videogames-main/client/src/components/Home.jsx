import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterGamesByGenre,
  getGenres,
  filterGamesCreated,
  orderByName,
  orderByRating,
  getNameGames,
} from "../actions";
import Header from "./Header";
import Card from "./Card";
import Paginado from "./Paginado";
import Loading from "./Loading";
import styles from "./styles/Home.module.css";
import s from "./styles/Header.module.css";
import sty from "./styles/SearchBar.module.css";
import imgProfile from "./styles/Profile.png";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [order, setOrder] = useState("");
  const [name, setName] = useState("");

  const allGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genresGet);
  // console.log(allGenres);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    setName("");
  }, [dispatch]); //Me traigo todos los juegos SEGUN EL DISPATCH | cada vez que se renderiza Home

  // PAGINATION ------------------------------
  const [currentPage, setCurrentPage] = useState(1); //Me guardo la pagina actual, siempre empezamos desde la 1
  const [gamesPerPage, setGamesPerPage] = useState(15); //Seteo la cantidad de juegos que va a haber por pagina
  const indexOfLastGame = currentPage * gamesPerPage; //Calculo el indice del ultimo juego que va a aparecer en la pagina
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //Calculo el indice del primer juego que va a aparecer en la pagina
  const currentGames = allGames?.slice(indexOfFirstGame, indexOfLastGame); //Agarro de allGames los juegos que van a aparecer en la pagina, desde el indice de firstGame hasta el indice de lastGame
  const paginate = (pageNumber) => setCurrentPage(pageNumber); //Funcion que me permite cambiar de pagina

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameGames(name));
    setCurrentPage(1);
    setName("");
    navigate.replace("/home");
  };

  // // RELOAD PAGE ------------------------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  // FILTER BY GENRE ------------------------------
  const handleGenreFilter = (e) => {
    e.preventDefault();
    dispatch(filterGamesByGenre(e.target.value));
    setCurrentPage(1);
  };

  // FILTER BY CREATED ------------------------------
  const handleCreatedFilter = (e) => {
    e.preventDefault();
    dispatch(filterGamesCreated(e.target.value));
    setCurrentPage(1);
  };

  // ORDER BY NAME ------------------------------
  const handleNameOrder = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  // ORDER BY RATING ------------------------------
  const handleRatingOrder = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  return (
    <div className={styles.home}>
      {/* <Header/> */}
      <header className={s.header}>
        <nav>
          <ul>
            <Link className={s.titleLogo} to="/home">
              <li className={s.liLogo}>GAMES</li>
            </Link>
            <li className={s.search}>
              <div className="search-bar">
                <input
                  className={sty.input}
                  type="text"
                  placeholder="Search a Game..."
                  onChange={(e) => handleInputChange(e)}
                />
                <NavLink to="/home">
                  <button
                    className={sty.btnSearch}
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    <i class="bx bx-search"></i>
                  </button>
                </NavLink>
              </div>
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
      <header className={styles.headerHome}>
        <NavLink to="/home">
          <button className={styles.btnHome} onClick={(e) => handleClick(e)}>
            Back to All
          </button>
        </NavLink>
        <NavLink to="/videogames/create">
          <button className={styles.btnAdd}>Add Game</button>
        </NavLink>
      </header>
      {/* Filters -------------------- */}
      <div className={styles.selects}>
        <select
          className={styles.orderAndFilter}
          onChange={(e) => handleNameOrder(e)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          className={styles.orderAndFilter}
          onChange={(e) => handleRatingOrder(e)}
        >
          <option value="fuer-asc">Less Rating</option>
          <option value="fuer-desc">More rating</option>
        </select>
        <select
          className={styles.orderAndFilter}
          onChange={(e) => handleGenreFilter(e)}
        >
          <option value="" disabled selected>
            Filter by Genre
          </option>
          <option value="todos">All</option>
          {allGenres &&
            allGenres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>

        <select
          className={styles.orderAndFilter}
          onChange={(e) => handleCreatedFilter(e)}
        >
          <option value="" disabled defaultValue>
            Created by
          </option>
          <option value="todos">All</option>
          <option value="nosotros">Data Base</option>
          <option value="api">Api</option>
        </select>
      </div>
      <div className={styles.paginado}>
        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <div className={styles.divCard}>
        {currentGames.length > 0 ? (
          currentGames.map((videogame) => (
            <>
              <Link key={videogame.id} to={`/videogame/${videogame.id}`}>
                <Card
                  key={videogame.name}
                  name={videogame.name}
                  image={
                    videogame.image
                      ? videogame.image
                      : "https://androidayuda.com/wp-content/uploads/2019/07/android-error.jpg"
                  }
                  genres={videogame.genres}
                  // platforms={videogame.platforms}
                  // rating={videogame.rating}
                />
              </Link>
            </>
          ))
        ) : (
          <>
            <Loading className={styles.loading} />
          </>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogames, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/AddGame.module.css";

function validate({
  name,
  image,
  description,
  genres,
  platforms,
  rating,
  release_date,
}) {
  const errors = {};
  if (!name) {
    errors.name = <b>Enter name ❌</b>;
  } else if (!/^[a-zA-Z\s]*$/.test(name)) {
    errors.name = <b>Characters are not allowed ❌</b>;
  }
  if (!image) errors.image = <b>Image is required❌</b>;
  if (!description) errors.description = <b>Description is required❌</b>;
  if (!genres.length && genres.length > 5) {
    errors.genre = <b>Must choose a Videogame Genre between 1 - 5 ❌</b>;
  }

  if (!platforms.length) {
    errors.platforms = <b>Must choose a platform ❌</b>;
  }
  if (!rating.length || rating > 5 || rating <= 0) {
    errors.rating = <b>Specific a rating 1-5 ❌</b>;
  }
  if (!release_date) errors.release_date = <b>Release date is required❌</b>;

  return errors;
}

export default function AddGame() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genresGet);
  // const videogame = useSelector((state) => state.videogames)

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [game, setGame] = useState({
    name: "",
    image: "",
    description: "",
    genres: [],
    platforms: [],
    rating: 0,
    release_date: "",
  });
  const { name, image, description, genres, platforms, rating, release_date } =
    game;
  console.log(game);

  const handleOnChange = (e) => {
    // e.preventDefault();
    
      setGame({
        ...game,
        [e.target.name]: e.target.value,
      });
    
    setErrors(
      validate({
        ...game,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDelete = (el) => {
    setGame({
      ...game,
      genres: game.genres.filter((e) => e !== el),
    });
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    if (genres.length === 2) {
      alert("limit 2 genres");
    } else if (genres.length < 2) {
      setGame({
        ...game,
        genres: [...genres, e.target.value],
      });
    }
  };

  function handleCheck(e) {
    // e.preventDefault();
    // if (platforms.length === 10) {
    //   alert("limit 10 platforms");
    // } else if (platforms.length < 10) {
      // setGame({
      //   ...game,
      //   platforms: [...platforms, e.target.value],
      // });
    // }

    if(e.target.checked){   //true o false
        setGame({
            ...game,
            platforms: [...platforms, e.target.value]
            //platforms.join(', ')
        })
    }
  }

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(game);
    try{
      if (
        name.length !== 0 &&
        // image.length !== 0 &&
        description.length !== 0 &&
        genres.length !== 0 &&
        platforms.length !== 0 &&
        rating.length !== 0 &&
        rating > 0 && rating < 6 &&
        release_date.length !== 0
      ) {
        dispatch(postVideogames(game));
        setGame({
          name: "",
          image: "",
          description: "",
          genres: [],
          platforms: [],
          rating: 0,
          release_date: "",
        });
        history.push("/home");
      }
      else if(name.length === 0 ||
        // image.length === 0 ||
        description.length === 0 ||
        genres.length === 0 ||
        platforms.length === 0 ||
        release_date.length === 0){
          alert("Please fill all the fields");
      }
    }catch{
      console.log('Error to Create a Game')
    }
    
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.divBtnBack}>
          <Link to="/home">
            <button className={styles.btnBack}>Back</button>
          </Link>
        </div>

        <div className={styles.separed}>
          <p>
            <label>Name:</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => handleOnChange(e)}
            />
          </p>

          <p>
            <label>Description:</label>
            <textarea
              className={styles.description}
              placeholder="Description"
              value={description}
              name="description"
              onChange={(e) => handleOnChange(e)}
            />
          </p>
          <label>img:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="img"
            value={image}
            name="image"
            onChange={(e) => handleOnChange(e)}
          />
          <div className={styles.hiddenCB}>
            <div className={styles.genres}>
              <label>Genres:</label>
              <select
                className={styles.select}
                onChange={(e) => handleSelectChange(e)}
              >
                {allGenres.map((genre) => (
                  <option
                    className={styles.options}
                    key={genre.id}
                    value={genre.name}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
              <ul className={styles.ul}>
            <li className={styles.li} key={"key"}>
              {game.genres.map((el) => (
                <button
                  className={styles.btnGenre}
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </button>
              ))}
            </li>
          </ul>
            </div>
          </div>
          <div>
            <label>Platforms:</label>
            <label className={styles.labelCheck}>
              <input
              className={styles.checks}
                type="checkbox"
                value="PC"
                name="PC"
                onChange={(e) => handleCheck(e)}
              />
              PC
            </label>
            <label className={styles.labelCheck}>
              <input
              className={styles.checks}
                type="checkbox"
                value="Nintendo Switch"
                name="Nintendo Switch"
                onChange={(e) => handleCheck(e)}
              />
              Nintendo Switch
            </label>
            <label className={styles.labelCheck}>
              <input
              className={styles.checks}
                type="checkbox"
                value="Xbox Series S/X"
                name="Xbox Series S/X"
                onChange={(e) => handleCheck(e)}
              />
              Xbox Series S/X
            </label>
            <label className={styles.labelCheck}>
              <input
              className={styles.checks}
                type="checkbox"
                value="PlayStation 4"
                name="PlayStation 4"
                onChange={(e) => handleCheck(e)}
              />
              PlayStation 4
            </label>
            <label className={styles.labelCheck}>
              <input
              className={styles.checks}
                type="checkbox"
                value="PlayStation 5"
                name="PlayStation 5"
                onChange={(e) => handleCheck(e)}
              />
              PlayStation 5
            </label>
          </div>
          <p>
            <label>Rating:</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Rating 1 - 5"
              value={rating}
              name="rating"
              onChange={(e) => handleOnChange(e)}
            />
          </p>
          <p>
            <label>Release Date:</label>
            <input
              className={styles.input}
              type="date"
              placeholder="Release Date"
              value={release_date}
              name="release_date"
              onChange={(e) => handleOnChange(e)}
            />
          </p>
          <div className={styles.btnSubmit}>
            <button className={styles.btnSub} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className={styles.danger}>
        {errors.name && <p className={styles.error}>{errors.name}</p>}
        {errors.genres && <p className={styles.error}>{errors.genres}</p>}
        {errors.platforms && <p className={styles.error}>{errors.platforms}</p>}
        {errors.description && (
          <p className={styles.error}>{errors.description}</p>
        )}
        {errors.rating && <p className={styles.error}>{errors.rating}</p>}
        {errors.release_date && (
          <p className={styles.error}>{errors.release_date}</p>
        )}
      </div>
    </div>
  );
}

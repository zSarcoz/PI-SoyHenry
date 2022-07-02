import React, {useState, useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import { postVideogames,getGenres} from '../actions';
import { useDispatch,useSelector } from 'react-redux';
import styles from "./styles/AddGame.module.css";

function validate({
    name,
    image,
    description,
    genre,
    platforms,
    rating,
    release_date
    }) {
    const errors = {};
    if (!name) {
        errors.name = <b>Enter name ❌</b>;
      } else if (!/^[a-zA-Z\s]*$/.test(name)){ 
          errors.name = <b>Characters are not allowed ❌</b>
      }
    if (!image) errors.image = <b>Image is required❌</b>;
    if (!description) errors.description = <b>Description is required❌</b>;
    if (!genre) errors.genre = <b>Genres is required❌</b>;
    if (!platforms) errors.platforms = <b>Platforms is required❌</b>;
    if (!rating) errors.rating = <b>Rating is required❌</b>;
    if (!release_date) errors.release_date = <b>Release date is required❌</b>;
    return errors;
}
    
export default function AddGame() {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genresGet);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const [errors, setErrors] = useState({});
    const [game, setGame] = useState({
        name: "",
        image: "",
        description: "",
        genre: [],
        platforms: [],
        rating: "",
        release_date: "",
    });
    const { name, image, description, genre, platforms, rating, release_date } = game;

    const handleOnChange = (e) => {
        e.preventDefault();
        setGame({
            ...game,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...game,
            [e.target.name]: e.target.value
        }));
    }

    const handleSelectChange = (e) =>{
        e.preventDefault();
        if (genre.length === 10) {
            alert('limit 10 types')
          }else if (genre.length < 10) {
            
            setGame({
              ...game,
              genre: [...genre, e.target.value]
            })
            
          }
    }

    const handleSelectChangePlatforms = (e) =>{
        e.preventDefault();
        if (platforms.length === 10) {
            alert('limit 10 types')
          }else if (platforms.length < 10) {
            
            setGame({
              ...game,
              platforms: [...platforms, e.target.value]
            })
            
          }
    }

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postVideogames(game));
        setGame({
            name: "",
            image: "",
            description: "",
            genre: [],
            platforms: [],
            rating: "",
            release_date: "",
        });
        history.push('/home');
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={e=>handleSubmit()}>
                <div className={styles.divBtnBack}>
                    <Link to="/home">
                        <button className={styles.btnBack}>Back</button>
                    </Link>
                </div>
                
            </form>
        </div>
    )
}
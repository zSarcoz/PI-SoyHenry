import React, { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNameGames } from "../actions";
import styles from "./styles/SearchBar.module.css";

export default function SearchBar() {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameGames(name));
    setName("");
    navigate.replace("/home");
  };

  return (
    <div className="search-bar">
      <input
        className={styles.input}
        type="text"
        placeholder="Search a Game..."
        onChange={(e) => handleInputChange(e)}
      />
      <NavLink to="/home">
        <button
          className={styles.btnSearch}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          <i class="bx bx-search"></i>
        </button>
        {/* <button type="submit" onClick={() => dispatch(getNameGames(name))}>Search</button> */}
      </NavLink>
    </div>
  );
}

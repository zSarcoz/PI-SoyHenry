import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getNameGames} from "../actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getNameGames(name));
    }

    return(
        <div className="search-bar">
            <input type="text" placeholder="Search for a game" onChange={(e)=>handleInputChange()}/>
            <button type="submit" onClick={(e) =>handleSubmit(e)}>Search</button>
            {/* <button type="submit" onClick={() => dispatch(getNameGames(name))}>Search</button> */}
        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameGames } from "../actions";
import SearchBar from "./SearchBar";
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
}
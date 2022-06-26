const axios = require("axios");

//Create and export actions called like I want them to be

export function getVideogames() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: response.data,
    });
  };
}

export function getNameGames(name) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({
      type: "GET_NAME_GAMES",
      payload: response.data,
    });
  };
}

export function getGameById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_VIDEOGAME_ID",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterGamesByGenre(payload) {
  return {
    type: "FILTER_GAMES_BY_GENRE",
    payload,
  };
}

export function filterGamesCreated(payload) {
  return {
    type: "FILTER_GAMES_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

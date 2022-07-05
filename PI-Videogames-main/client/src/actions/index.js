import axios from "axios";

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
export function postVideogames(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/videogames",payload);
      console.log(response);
      return response;
      // alert('Succefully created');
    } catch (err) {
      console.log(err);
    }
  };
}
export function setGenres() {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/genres");
    return dispatch({
      type: "SET_GENRES",
      payload: response.data,
    });
  };
}
export function getGenres() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: response.data,
    });
  };
}

export function getNameGames(name) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/videogames?name=` + name)
      .then((videogames) =>
        dispatch({
          type: "GET_NAME_GAMES",
          payload: videogames.data,
        })
      )
      .catch((err) => alert(`Videogames doesn't exist "${name}"`));
  };
}

export function getGameById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/videogame/${id}`);
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

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getClean() {
  return {
    type: "GET_CLEAN",
    payload: [],
  };
}

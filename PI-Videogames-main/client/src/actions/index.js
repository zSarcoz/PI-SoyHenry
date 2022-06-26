const axios = require('axios');

export function getVideogames() {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/videogames');
        dispatch({
            type: 'GET_VIDEOGAMES',
            payload: response.data
        });
    }
}

export function getNameGames(name) {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/videogames/${name}`);
        dispatch({
            type: 'GET_NAME_GAMES',
            payload: response.data
        });
    }
}


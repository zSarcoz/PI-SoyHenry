const axios = require('axios');

export default async function getVideogames(url) {
    getAllGames: () => {
        return axios.get('http://localhost:3001/videogames')
    }
}


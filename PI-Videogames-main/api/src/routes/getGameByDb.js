const axios = require("axios");
const { Genre, Videogame } = require("../db.js");
const { APIKEY } = process.env;

const getById = async (id) => {
  try {
    // First, identify is the id it's from the database UUID
    if (typeof id === "string" && id.length > 6) {
      const dB = await Videogame.findByPk(id, { include: Genre });
      return {
        id: dB.id,
        name: dB.name,
        description: dB.description,
        release_date: dB.release_date,
        rating: dB.rating,
        platforms: dB.platforms,
        genres: dB.genres.map((genre) => genre.name),
      };
      
    }

    // If the id is from the api
    const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`);
    return {
      id: game.data.id,
        name: game.data.name,
        description: game.data.description,
        release_date: game.data.released,
        rating: game.data.rating,

        platforms: game.data.platforms.map((game) => game.platform.name),
        genres: game.data.genres.map((genre) => genre.name),
    };

    // return pokemonApi;
  } catch (e) {
    throw new Error("Ups, server error");
  }
};

module.exports = {
    getById
}
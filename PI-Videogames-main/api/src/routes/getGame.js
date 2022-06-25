const axios = require("axios");
const { Genre, Videogame } = require("../db.js");
const { APIKEY } = process.env;


const getGames = async (name) => {
  try {
    const gameDb = await Videogame.findOne({
        where: {
            name
        },
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
        
    });
    if (gameDb) {
        return gameDb;
    }
    const game = await axios.get(`https://api.rawg.io/api/games/${name}?key=${APIKEY}`);
    return {
      id: game.data.id,
      name: game.data.name,
      description: game.data.description,
      release_date: game.data.released,
      rating: game.data.rating,
    //   platforms: game.data.platforms.map((game) => game.platform.name),
    //   genres: game.data.genres.map((genre) => genre.name),
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
    getGames
}

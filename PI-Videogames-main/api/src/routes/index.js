const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { getGenres, getGenresDb } = require("./getGenres");
const { APIKEY } = process.env;
const { getById } = require("./getGameByDb");
const {getGames} = require("./getGame");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getGamesi = async () => {
  try {
    const url_game = await axios.get(
      `https://api.rawg.io/api/games?key=${APIKEY}`
    );
    const apiGame = await url_game.data.results.map((game) => {
      return {
        // id: game.id,
        name: game.name,
        rating: game.rating,
        // description:game.description,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((game) => game.platform.name),
        release_date: game.platforms.map((game) => game.released_at),
        
      };
    });
    return apiGame;
  } catch (error) {
    return new Error(error + "error en el servidor");
  }
};

// SELECT * FROM videogames
const getByDb = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllGames = async () => {
  try {
    const gamesInfo = await getGamesi();
    const dbInfo = await getByDb();
    const infoAll = gamesInfo.concat(dbInfo);
    return infoAll;
  } catch (error) {
    return new Error(error + "error en el servidor");
  }
};
router.get("/videogames", (req, res) => {
    const {name} = req.query
    getAllGames().then((data) => {
        if(name){
            getGames(name).then((response) => {
                if(response.name){
                    res.json(response)
                }else {
                    res.status(404).send('Videogame not found')
                }
            })
        }else if(data){
            res.json(data)
        }
    })
});

router.get("/videogame/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const games = await getById(id);
      games
        ? res.status(200).send(games)
        : res.status(404).send("No se encontro un video juego con ese id");
    }
  } catch (error) {
    res.status(404).json({ error: "error en el servidor" });
  }
});

router.post("/videogames", async (req, res, next) => {
  try {
    let {
      name,
      rating,
      platforms,
      release_date,
      description,
      createdInDb,
      genre,
    } = req.body;

    const gameCreate = await Videogame.create({
      name,
      rating,
      platforms,
      release_date,
      description,
      createdInDb,
    });

    let genreDb = await Genre.findAll({ where: { name: genre } });
    gameCreate.addGenre(genreDb);
    res.status(201).json("Video juego creado");
  } catch (error) {
    next(error);
  }
});

router.post("/genres", async (req, res, next) => {
  try {
    const genre = await getGenres();
    res.send(genre);
  } catch (err) {
    next(err);
  }
});

router.get("/genres", async (req, res, next) => {
  try {
    const genres = await getGenresDb();
    genres
      ? res.status(200).send(genres)
      : res.status(404).send("No se encontro un video juego con ese nombre");
  } catch (error) {
    next(error);
  }
});
module.exports = router;

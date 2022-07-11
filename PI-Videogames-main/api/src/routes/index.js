const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { getGenres, getGenresDb } = require("./getGenres");
const { APIKEY } = process.env;
const { getById } = require("./getGameByDb");
const { getGames } = require("./getGame");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getGamesi = async () => {
  try {
    let games = [];
    let address = "";
    while (games.length < 100) {
      !games.length &&
        (address = `https://api.rawg.io/api/games?key=${APIKEY}`);
      let { data } = await axios.get(address);
      games = [...games, ...data.results];
      address = data.next;
    }

    let apiGame = games.map((el) => {
      return {
        id: el.id,
        name: el.name,
        description: el.description_raw,
        rating: el.rating,
        platforms: el.platforms.map((el) => el.platform.name),
        release_date: el.released,
        image: el.background_image,
        genres: el.genres.map((genre) => genre.name),
      };
    });

    return apiGame;
  } catch (error) {
    return new Error(error + "error en el servidor");
  }
};

// SELECT * FROM videogames
const getByDb = async () => {
  try {
    const game = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const gameInfo = await game.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.image,
        rating: game.rating,
        genres: game.genres.map((genre) => {
          return genre.name;
        }),
        platforms: game.platforms,
        release_date: game.release_date,
        description: game.description,
        createdInDb: game.createdInDb,
      };
    });
    return gameInfo;
  } catch (error) {
    return new Error(error + "error en el servidor");
  }
};

const getAllGames = async () => {
  const gamesInfo = await getGamesi();
  const dbInfo = await getByDb();
  const infoAll = [...gamesInfo, ...dbInfo];
  return infoAll;
};
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  const games = await getAllGames();
  if (name) {
    let gameName = await games.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    gameName.length
      ? res.status(200).send(gameName)
      : res.status(404).json("Videogame not found");
  } else {
    res.json(games);
  }
});

router.get("/videogame/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const games = await getById(id);
      games
        ? res.status(200).json(games)
        : res.status(404).send("No se encontro un video juego con ese id");
    }
  } catch (error) {
    res.status(404).json({ error: "error en el servidor" });
  }
});

router.post("/videogames", async (req, res, next) => {
  const { name, image, rating, platforms, release_date, description, genres } =
    req.body;

  try {
    const gameCreate = await Videogame.create({
      name,
      image,
      rating,
      platforms,
      release_date,
      description,
    });

    let genreDb = await Genre.findAll({ where: { name: genres } });
    gameCreate.addGenre(genreDb);
    res.status(201).json("Video juego creado");
  } catch (error) {
    next(error);
  }
});

router.post("/genres", async (req, res, next) => {
  try {
    const genre = await getGenres();
    res.json(genre);
  } catch (err) {
    next(err);
  }
});

router.get("/genres", async (req, res, next) => {
  try {
    const genres = await getGenresDb();
    genres
      ? res.status(200).json(genres)
      : res.status(404).send("No se encontro un video juego con ese nombre");
  } catch (error) {
    next(error);
  }
});

router.delete("/videogames/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Videogame.destroy({ where: { id } });
    res.send('Videogame deleted')
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

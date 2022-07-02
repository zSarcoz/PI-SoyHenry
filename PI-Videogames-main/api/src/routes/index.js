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
    const url_game = await axios.get(
      `https://api.rawg.io/api/games?key=${APIKEY}`
    );
    const apiGame = await url_game.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((game) => game.platform.name),
        release_date: game.platforms.map((game) => game.released_at),
        description: game.description,
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
        genres: game.genres.map((genre) => {return genre.name}),
        // platforms: game.platforms.map((game) => game.platforms),
        platforms: game.platforms,
        release_date: game.release_date,
        description: game.description,
        createdInDb: game.createdInDb
      };
    })
    return gameInfo;
  } catch (error) {
    return new Error(error + "error en el servidor");
  }
};

const getAllGames = async () => {
  // try {
    const gamesInfo = await getGamesi();
    const dbInfo = await getByDb();
    // const infoAll = gamesInfo.concat(dbInfo);
    const infoAll = [...gamesInfo, ...dbInfo];
    return infoAll;
  // } catch (error) {
  //   return new Error(error + "error en el servidor");
  // }
};
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  const games = await getAllGames();
  if (name) {
    let gameName = await games.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    gameName.length ? res.json(gameName) : res.json("error");
  } else {
    res.json(games);
  }
  // getAllGames().then((data) => {
  //     if(name){
  //         getGames(name).then((response) => {
  //             if(response){
  //                 res.json(response)
  //             }else {
  //                 res.status(404).send('Videogame not found')
  //             }
  //         })
  //     }else if(data){
  //         res.json(data)
  //     }
  // })
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

// router.post('/videogames', async (req, res) => {
//   let { name, image, description, release_date, rating, platforms, genres } = req.body;
//   try {
//       const gameCreated = await Videogame.findOrCreate({ //devuelvo un array (OJOOO!!!!)
//           where: {
//               name,
//               image,
//               description,
//               release_date,
//               rating,
//               platforms,
//           }
//       })
//       await gameCreated[0].setGenres(genres); // relaciono ID genres al juego cread
//   } catch (err) {
//       console.log(err);
//   }
//   res.send('Created succesfully, saludos desde el BACK!!')
// })

router.post("/videogames", async (req, res, next) => {
  const {
    name,
    image,
    rating,
    platforms,
    release_date,
    description,
    // createdInDb,
    genres,
  } = req.body;

  try {
    // const game = await getGames(name)

    // if (game.id) {
    //   return res.status(404).send('Already exists');
    // }

    const gameCreate = await Videogame.create({
      name,
      image,
      rating,
      platforms,
      release_date,
      description,
      // createdInDb,
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
module.exports = router;

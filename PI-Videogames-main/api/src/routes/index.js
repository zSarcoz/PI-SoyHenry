const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { APIKEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getGames = async()=>{
  try {
      
      const url_game = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
      const apiGame = await url_game.data?.results.map(game => {
          return {
              id:game.id,
              name:game.name,
              rating:game.rating,
              genres:game.genres.map(genre => genre.name),
              platforms:game.platforms.map(game => game.platform.name),
              release_date:game.platforms.map(game => game.released_at)
              
          }
      })
      return apiGame;
  } catch (error) {
      return new Error(error + 'error en el servidor')
  }
}

// SELECT * FROM videogames
const getByDb = async() => {
  return await Videogame.findAll({
      include:{
          model:Genre,
          attributes:['name'],
          through:{
              attributes:[],
          }
      }
  })
}

const getAllGames = async()=>{
  try {
      const gamesInfo = await getGames();
      const dbInfo = await getByDb();
      const infoAll = gamesInfo.concat(dbInfo);
      return infoAll;  
  } catch (error) {
      return new Error(error +'error en el servidor')
  }
}
router.get('/videogames', async(req, res) =>{
  try {
    const {name} = req.query;
    const games = await getAllGames();
    if(name){
        let gameName = games.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length > 0
            ?res.status(200).json(gameName)
            :res.status(404).send('No se encontro un video juego con ese nombre')
     

    }else{
        res.status(200).json(games)
    }   
} catch (error) {
    res.status(404).json({error:'error en el servidor'})
}
});

module.exports = router;

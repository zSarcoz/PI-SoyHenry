const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { APIKEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getGames = async () => {
  try {
    const url_game = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
    const api_Game = await url_game.data?.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((el) => el.platform.name),
        release_date: game.platforms.map((el) => el.released_at),
      };
    });
    return api_Game;
  } catch (e) {
    return new Error(error + "error en el servidor");
  }
};

const getByDb = async()=>{
    
        //SELECT * FROM videogames
        return await Videogame.findAll({
            include:{
                model:Genre,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }
        })
} 

// const getDataApi = async(req,res)=>{
//     const api_Game = await getGames();
//     return api_Game;
// }  XXXX

const getAllGames = async () => {
    try{
        const api_Game = await getGames();
        const myDb_info = await getByDb();
        const allInfo = api_Game.concat(myDb_info);
        return allInfo;
    }catch(err){
        return new Error(err + "error en el servidor");
    }
}

router.get("/", async (req, res) => {
    try{
        const {name} = req.query;
        const allGames = await getAllGames();
        if(name){
            const games = allGames.filter(game=>game.name.toLowerCase().includes(name.toLowerCase()));
            return res.status(200).json(games);
        }
    }catch(error){
        return res.status(400).json({error:'error en el servidor'});
    }

})

module.exports = router;

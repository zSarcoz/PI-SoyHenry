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
      
      const url_game = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page_size=15`);
      const apiGame = await url_game.data?.results.map(game => {
          return {
              id:game.id,
              name:game.name,
              rating:game.rating,
              // description:game.description,
            //   genres:game.genres.map(genre => genre.name),
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

router.get('/videogame/:id', async(req, res) =>{
  // const {id} = req.params;
  // try {
  //     const gamesID = await getAllGames();
  //     if(id){
  //         let gameId = gamesID.filter(el => el.id == id);
  //         gameId
  //             ?res.status(200).send(gameId)
  //             :res.status(404).send('No se encontro un video juego con ese nombre')
  //         /* gameName.length
  //             ?res.status(200).json(gameName)
  //             :res.status(404).send('No se encontro un ID') */
  //     }
  // } catch (error) {
  //     next(error)
  // }
  const {id} = req.params;
  try {
    const games = await getAllGames();
    if(id){
      let game = games.filter(game => game.id === Number(id));
      res.status(200).send(game)
    }else{
        res.status(404).send('No se encontro un video juego con ese id')
    }
} catch (error) {
    res.status(404).json({error:'error en el servidor'})
}
});

router.post('/videogames', async(req, res, next) =>{
    try {
        
        let{
            name,
            rating,
            platforms,
            release_date,
            description,
            genre
        } = req.body;
    
        const gameCreate = await Videogame.create({
            name,
            rating,
            platforms,
            release_date,
            description
        })
    
        let genreDb = await Genre.findAll({where: {name:genre}})
        gameCreate.addGenre(genreDb)
        res.send('Personaje creado con exito')
    
    } catch (error) {
        next(error)
    }
})
  //   const newVideogame = await Videogame.findOrCreate({
  //     where:{
  //       name,
  //       description,
  //       release_date,
  //       rating,
  //       platforms,
  //     }
  //   })
  //   await newVideogame[0].addGenres(genres);
  //   res.status(201).json('Successfully videogame created')

  // }catch(error){
  //   next(error)
  // }

  router.get('/genres',async(req,res,next)=>{
    try{
        const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
        // const genres = apiGenres.data.results.map(genre => {
        //     return {
        //         // id:genre.id,
        //         name:genre.name
        //     }
        // })
        // return res.status(200).json(genres)
        const genres = apiGenres.data.results.map(genre => genre.name)
        genres.forEach(element => {
            Genre.findOrCreate({where:{name:element}})
        });
        const allGenre = await Genre.findAll();
        res.status(200).json(allGenre);
    }catch(error){
      next(error)
    }
  })
module.exports = router;

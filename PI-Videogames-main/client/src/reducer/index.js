const initialSatate = {
    videogames: [],
    allVideogames: [],
}

function rootReducer(state = initialSatate, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }
        case 'FILTER_GAMES_BY_GENRE':
            const allGames = state.videogames.filter(game => game.genre === action.payload)
            return {
                ...state,
                allGames
            }
        case 'FILTER_GAMES_CREATED':
            const allGamesCreated = state.videogames.filter(game => game.created === action.payload)
            return {
                ...state,
                allGamesCreated
            }
        default:
            return state
    }
}
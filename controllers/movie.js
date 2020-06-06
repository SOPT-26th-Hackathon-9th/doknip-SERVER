const pool=require('../modules/pool');
const util=require('../modules/util');
const responseMessage=require('../modules/responseMessage');
const statusCode=require('../modules/statusCode');
const Movie = require('../models/movie');

const controllers = {
    getReservedMovie : async (req, res) => {
        const id = req.params.id;

        const result = await Movie.getMovieReserved(id);
        if (!id){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
    
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_INFO_SUCCESS, result));
    },
    getMovieInfo : async (req, res) => {
        const movie_id = req.params.movie_idx;

        if (!movie_id){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
    
        const characInfo = await Movie.getCharacterInfo(movie_id);
        const result = await Movie.getMovieInfo(movie_id);
        const genre = await Movie.getMoviesByGenre(result[0]["genre"])
    
        
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_INFO_SUCCESS,{result, characInfo, genre}));
    },
    getMovieReleased : async (req, res) => {
        const result = await Movie.getMovieReleased();
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_RELEASE_SUCCESS, result));
    },
    getMovieUnreleased : async (req, res) => {
        const result = await Movie.getMovieUnreleased();
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_RELEASE_SUCCESS, result));
    
    },
    getMovieThumbs : async (req, res) => {
        const movie_id = req.params.movie_idx;
        const result = await Movie.getMovieThumbnails(movie_id);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_SUCCESS, result));
    }
}

module.exports = controllers;
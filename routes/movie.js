const express = require('express');
const router = express.Router();
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const Movie = require('../models/movie');

/**
 * 내가 예약한 영화
 */
router.get('/reserved/:id', async(req, res) => {
    // request params 에서 데이터 가져오기
    const id = req.params.id;

    const result = await Movie.getMovieReserved(id);
    if (!id){
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_INFO_SUCCESS, result));
});

/**
 *  영화 정보
 */
router.get('/info/:movie_idx', async(req, res) => {
    // request params 에서 데이터 가져오기
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

});

/**
 * 상영 중 영화
 */
router.get('/list/released', async(req, res) => {
    const result = await Movie.getMovieReleased();
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_RELEASE_SUCCESS, result));
});

/**
 * 상영 예정 영화
 */
router.get('/list/unreleased', async(req, res) => {
    const result = await Movie.getMovieUnreleased();
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_RELEASE_SUCCESS, result));
});

module.exports = router;
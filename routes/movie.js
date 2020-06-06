const express = require('express');
const router = express.Router();
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const Movie = require('../models/movie');

router.get('/', function(req, res, next){
    res.send("독립 영화");
});

/**
 * 내가 예약한 영화
 */
router.get('/like/:id', async(req, res) => {
    // request params 에서 데이터 가져오기
    const id = req.params.id;

    res.send('내가 예약한 영화');
});


/**
 * 상영 예정 + 상영 중 영화
 */
router.get('/release', async(req, res) => {
    res.send('상영 예정인 영화, 상영 중인 영화');
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

    const result = await Movie.getMovieInfo(movie_id);
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.READ_MOVIE_INFO_SUCCESS, responseMessage.READ_MOVIE_INFO_SUCCESS, result));

});

/**
 * 비슷한 영화 추천
 */
router.get('/list/:genreCode', async(req, res) => {
    // request params 에서 데이터 가져오기
    const genre = req.params.genreCode;

    res.send('비슷한 영화');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');

// 내가 예약한 영화
router.get('/reserved/:id', movieController.getReservedMovie);

// 영화 정보
router.get('/info/:movie_idx', movieController.getMovieInfo);

// 상영 중 영화
router.get('/list/released', movieController.getMovieReleased);

// 상영 예정 영화
router.get('/list/unreleased', movieController.getMovieUnreleased);

// 영화 썸네일 배너
router.get('/thumbs/:movie_idx', movieController.getMovieThumbs);

module.exports = router;
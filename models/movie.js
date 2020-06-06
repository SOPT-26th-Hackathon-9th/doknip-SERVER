const pool = require('../modules/pool');
const table = 'movie';

const movie = {
    getMovieReserved : async(userIdx) => {
        const query = `select movieIdx, movieName, movieImg, release_flag, schedule from ${table} where movieIdx in (select movieIdx from reserve where userIdx=${userIdx}) order by (curdate() - schedule) desc`
        try{
            return await pool.queryParam(query);
        } catch (err){
            console.log('getMovieInfo err : ', err);
            throw err;
        }
    },
    getMovieInfo : async(movieIdx) => {
        const query = `select * from ${table} where movieIdx=${movieIdx};`;
        try{
            return await pool.queryParam(query);
        } catch (err){
            console.log('getMovieInfo err : ', err);
            throw err;
        }
    },
    getCharacterInfo: async(movieIdx) => {
        const query = `select * from charcter where movieIdx=${movieIdx};`;
        try{
            return await pool.queryParam(query);
        } catch (err){
            console.log('getCharacterInfo err : ', err);
            throw err;
        }
    },
    getMovieReleased : async() => {
        const query = `select movieIdx, movieImg from ${table} where release_flag=1;`;
        try{
            return await pool.queryParam(query);
        } catch (err){
            console.log('getMovieReleased err : ', err);
            throw err;
        }
    },
    getMovieUnreleased : async() => {
        const query = `select movieIdx, movieImg from ${table} where release_flag=0;`;
        try{
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getMovieUnreleased err : ', err);
            throw err;
        }
    },
    getMoviesByGenre : async(genreCode) => {
        const query = `select movieIdx, movieImg from ${table} where genre=${genreCode};`;
        try{
            return await pool.queryParam(query);
        } catch (err){
            console.log('getMoviesByGenre err : ', err);
            throw err;
        }
    }
}

module.exports = movie;
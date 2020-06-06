const pool = require('../modules/pool');
const table = 'movie';

const movie = {
    getMovieInfo : async(movieIdx) => {
        const query = `select * from ${table} where  movie_idx=${movieIdx};`;
        try{
            return await pool.queryParam(query);
        } catch (err){
            console.log('getMovieInfo err : ', err);
            throw err;
        }
    }

}

module.exports = movie;
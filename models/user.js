const pool = require('../modules/pool');
const table = 'user';

const user = {
    getUserInfo : async (userIdx) => {
        const query = `select * from ${table} where user_idx = ${userIdx}`;
        try{
            return await pool.queryParam(query);
        } catch(err){
            console.log('getUserInfo err : ', err);
            throw err;
        }
    }
}

module.exports = user;
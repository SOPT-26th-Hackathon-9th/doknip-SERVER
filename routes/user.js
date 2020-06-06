const express = require('express');
const router = express.Router();
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const User = require('../models/user');
const responseMessage = require('../modules/responseMessage');

router.get('/:id', async(req, res) => {
    // request params 에서 데이터 가져오기
    const id = req.params.id;

    // 유효성 확인
    if(!id){
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
    }

    const result = await User.getUserInfo(id);
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK,responseMessage.READ_USER_INFO_SUCCESS, result));
});

module.exports = router;


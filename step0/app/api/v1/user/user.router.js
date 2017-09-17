const express = require('express');
const router = express.Router();

const {duplicationCheckByUser, index, init, create} = require('./user.controller');

// 유저 정보 조회 API
router.get('/:userId', index);

// 유저 등록 init API
router.post('/', duplicationCheckByUser, init);

// 유저 등록 create API
router.post('/:userId', create);

module.exports = router;
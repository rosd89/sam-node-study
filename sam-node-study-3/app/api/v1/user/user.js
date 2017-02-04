const express = require('express');
const router = express.Router();

const userCtrl = require('./user.controller');
const userCheck = require('../util/duplication.checker').duplicationCheckByUser;

// 유저 등록 init
router.post('/', userCheck, userCtrl.init);

// 유저 등록 create
router.post('/:userId', userCtrl.create);

module.exports = router;
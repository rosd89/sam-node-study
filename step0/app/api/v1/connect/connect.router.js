const express = require('express');
const router = express.Router();
const {
  getClientSalt, loginValidation, create, update, destroy
} = require('./connect.controller');

const auth = require('../../util/authorize.checker');

// client salt 가져오기
router.get('/salt', getClientSalt);

// 로그인
router.post('/', loginValidation, create);

// 로그인 갱신
router.put('/', loginValidation, update);

// 로그아웃
router.delete('/', auth, destroy);

module.exports = router;
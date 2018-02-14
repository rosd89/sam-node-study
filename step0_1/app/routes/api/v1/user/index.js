const path = '/v1/users';
const router = require('express').Router();

// 유저 정보 조회 API
router.get('/:userId', require('./controller/showUser'));

// 유저 등록 init API
router.post('/', require('./controller/createUserInit'));

// 유저 등록 create API
router.post('/:userId', require('./controller/createUser'));

module.exports = {path, router};

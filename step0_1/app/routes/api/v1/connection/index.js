const path = '/v1/connection';
const router = require('express').Router();

const {auth} = require('../../../routeMiddleware');
const loginValidation = require('./middleware/loginValidation');
const {validConnection} = require('./validate');

// client salt 가져오기
router.get('/salt', require('./controller/getClientSalt'));

// Create Connection
router.post('/', validConnection, loginValidation, require('./controller/createConnection'));

// 로그인 갱신
router.put('/', validConnection, loginValidation, require('./controller/updateConnection'));

// 로그아웃
router.delete('/', auth, require('./controller/deleteConnection'));

module.exports = {path, router};

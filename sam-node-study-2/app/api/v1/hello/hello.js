const express = require('express');

const helloCtrl = require('./hello.controller');
const authMac = require('../util/auth.mac.checker');

const router = express.Router();

router.get('/', helloCtrl.index);

router.put('/', authMac.authCheckByMac, helloCtrl.update);

module.exports = router;
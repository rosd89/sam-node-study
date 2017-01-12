const express = require('express');
const authMac = require('../util/auth.mac.checker');

const router = express.Router();

router.get('/', )

router.put('/', authMac.authCheckByMac);

module.exports = router;
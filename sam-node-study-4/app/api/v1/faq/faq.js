const express = require('express');
const router = express.Router();

const faqCtrl = require('./faq.controller');
const faqAdminCtrl = require('./faq.controller');
const authCheckByMac = require('../util/auth.mac.checker').authCheckByMac;

// FAQ 추가
router.post('/', authCheckByMac, faqAdminCtrl.create);
// FAQ 수정
router.put('/:faqId', authCheckByMac, faqAdminCtrl.update);

module.exports = router;
const express = require('express');
const router = express.Router();

// const faqCtrl = require('./faq.controller');
const faqAdminCtrl = require('./faq.controller');
const authCheckByMac = require('../util/auth.mac.checker').authCheckByMac;

// FAQ 추가
router.post('/', authCheckByMac, faqAdminCtrl.create);

// FAQ 수정
router.put('/:faqId', authCheckByMac, faqAdminCtrl.update);

// FAQ 삭제
router.put('/delete/:faqId', authCheckByMac, faqAdminCtrl.deleteEditType);

// FAQ 배포
router.post('/deploy', authCheckByMac, faqAdminCtrl.deploy, faqAdminCtrl.sync);

module.exports = router;
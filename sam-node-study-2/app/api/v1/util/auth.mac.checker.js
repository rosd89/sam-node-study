const getmac = require('getmac');
const accessUser = require('../../../../../config/access_user.json');
const retMsg = require('./return.msg');

/**
 * mac addr 유효성 검사
 *
 * @param req
 * @param res
 * @param next
 */
exports.authCheckByMac = (req, res, next) => getmac.getMac((err, mac) => {
    if (accessUser.indexOf(mac) > -1) return next();
    else return retMsg.error404NotFound(res);
});
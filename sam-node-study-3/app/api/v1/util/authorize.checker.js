const getmac = require('getmac');
const accessUser = require('../../../../../config/access_user.json');
const hash = require('./hash.creator');
const retMsg = require('./return.msg');

const UserConnectInfo = require('../../../models').UserConnectInfo;

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

/**
 * 인증키 체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.authCheck = (req, res, next) => {
    let accessToken = req.body.accessToken;
    if (!accessToken) accessToken = req.query.accessToken;
    if (!accessToken) accessToken = req.params.accessToken;

    if (!accessToken) return retMsg.error400InvalidCall(req, res, 'ERROR_MISSING_PARAM', 'accessToken');
    else if (accessToken.length !== 64) return retMsg.error400InvalidCall(req, res, 'ERROR_INVALID_PARAM', 'accessToken');

    UserConnectInfo.findOne({
        where: {
            accessToken: accessToken
        }
    }).then(connection => {
        if (!connection) return retMsg.error400InvalidCall(req, res, 'ERROR_INVALID_ACCESS_TOKEN');

        const timeNum = connection.expiredTime.getTime() - new Date().getTime();
        if (timeNum < 0) {
            // 인증시간 만료
            return retMsg.error403Expired(res);
        }

        //인증시간 갱신
        connection.expiredTime = hash.getExpiredTime();
        connection.save()
            .then(connection => {
            })
            .catch(err => retMsg.error500Server(res, {err: err}));

        req.body.connectUserId = connection.userId;

        next();
    });
};
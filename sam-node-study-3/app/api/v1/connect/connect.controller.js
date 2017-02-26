const retMsg = require('../util/return.msg.js');
const hash = require('../util/hash.creator');

const UserInfo = require('../../../models').UserInfo;
const UserConnectInfo = require('../../../models').UserConnectInfo;

/**
 * clientSalt 가져오기 controller
 *
 * @param req
 * @param res
 */
exports.getClientSalt = (req, res) => {
    const userId = req.query.userId;
    if (!userId) return retMsg.error400InvalidCall(req, res, 'ERROR_MISSING_PARAM', 'userId');

    UserInfo.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        // getSalt 정책
        //   - 리턴값은 결과값이 성공일 때와 동일한 형태로 전송
        if (!user) {
            return retMsg.success200RetObj(res, {
                salt: hash.getSalt()
            });
        }

        return retMsg.success200RetObj(res, {
            salt: user.clientSalt
        });
    });
};

/**
 * 로그인 인증 확인 Middleware
 *
 * @param req
 * @param res
 * @param next
 */
exports.loginValidation = (req, res, next) => {
    const userId = req.body.userId;
    const hash1st = req.body.hash;

    if (!userId) return retMsg.error400InvalidCall(req, 'ERROR_MISSING_PARAM', 'userId');
    else if (!hash1st) return retMsg.error400InvalidCall(req, 'ERROR_MISSING_PARAM', 'hash');
    else if (hash1st.length !== 64) return retMsg.error400InvalidCall(req, 'ERROR_INVALID_PARAM', 'hash');

    UserInfo.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        if (!user) return retMsg.error404NotFound(res);

        const serverSalt = user.serverSalt;
        const hashToken = user.hashToken;

        const hash2nd = hash.getHash(hash1st, serverSalt);
        if (hashToken !== hash2nd) return retMsg.error401Unauthorized(res);

        next();

        return null;
    }).catch(err => retMsg.error500Server(res, {
        err: err
    }));
};

/**
 * 로그인 controller
 *
 * @param req
 * @param res
 */
exports.create = (req, res) => UserConnectInfo.destroy({
    where: {
        userId: req.body.userId,
    }
}).then(result => UserConnectInfo.create({
    userId: req.body.userId,
    accessToken: hash.getSalt(),
    expiredTime: hash.getExpiredTime()
})).then(connect => retMsg.success200RetObj(res, {
    accessToken: connect.accessToken
})).catch(err => retMsg.error500Server(res, {
    err: err
}));

/**
 *  로그인 갱신 controller
 *
 * @param req
 * @param res
 */
exports.update = (req, res) => UserConnectInfo.findOne({
    where: {
        userId: req.body.userId,
    }
}).then(connection => {
    if (!connection) return retMsg.error400InvalidCall(res, 'ERROR_NO_CONNECTION');

    // 인증정보 추가
    connection.accessToken = hash.getSalt();
    connection.expiredTime = hash.getExpiredTime();

    connection.save().then(_ => retMsg.success200RetObj(res, {
        accessToken: accessToken
    })).catch(err => retMsg.error500Server(res, {
        err: err
    }));
});

/**
 * 로그아웃 controller
 *
 * @param res
 * @param req
 */
exports.destroy = (req, res) => UserConnectInfo.destroy({
    where: {
        accessToken: accessToken
    }
})
    .then(_ => retMsg.success204(res))
    .catch(err => retMsg.error500Server(res, {
        err: err
    }));

const retMsg = require('./return.msg');

const UserInfo = require('../../../models').UserInfo;

/**
 * 유저 ID 중복체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.duplicationCheckByUser = (req, res, next) => {
    const userId = req.body.userId;

    if (!userId) {
        return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'userId');
    }

    UserInfo.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        if(!user){
            return next();
        }

        return retMsg.error400InvalidCall(res, 'ERROR_DUPLICATE', 'userId');
    });
};
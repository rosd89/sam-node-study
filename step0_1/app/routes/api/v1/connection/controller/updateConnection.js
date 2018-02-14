const {
  userConnection: {
    findOneConnection
  }
} = require('$service');

const {hash: {getSalt, getExpiredTime}, resMsg, err} = require('$routeLib');

/**
 * Update Connection Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({body}, res, next) => {
  try {
    const {userId} = body;
    const connection = findOneConnection({userId});
    if (!connection) err.noConnection();

    // 인증정보 갱신
    const accessToken = getSalt();
    connection.accessToken = accessToken;
    connection.expiredTime = getExpiredTime();

    await connection.save();

    resMsg.success201RetObjWithToken(res, accessToken);
  } catch (e) {
    next(e);
  }
};

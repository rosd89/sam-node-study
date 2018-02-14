const {
  userConnection: {
    createConnection, destroyConnection
  }
} = require('$service');

const {hash: {getSalt, getExpiredTime}, resMsg} = require('$routeLib');

/**
 * Create Connection Controller
 *
 * @param body
 * @param res
 * @param next
 */
module.exports = async ({body}, res, next) => {
  try {
    const {userId} = body;

    await destroyConnection({userId});
    const {accessToken} = await createConnection({userId, accessToken: getSalt(), expiredTime: getExpiredTime()});

    resMsg.success201RetObjWithToken(res, accessToken);
  } catch (e) {
    next(e);
  }
};

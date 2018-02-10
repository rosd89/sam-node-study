const {user: {findOneUser}} = require('$service');
const {hash: {getHash}, error} = require('$routeLib');

/**
 * 접속 정보 확인 Middleware
 *
 * @param body
 * @param res
 * @param next
 */
module.exports = async ({body}, res, next) => {
  try {
    const {userId: id, hash: hash1st} = body;

    const user = await findOneUser(undefined, {id});
    if (!user) error.notFoundUser();

    const {serverSalt, hashToken} = user;
    const hash2nd = getHash(hash1st, serverSalt);
    if (hashToken !== hash2nd) error.credentialsMismatch();

    next();
  } catch (e) {
    next(e);
  }
};

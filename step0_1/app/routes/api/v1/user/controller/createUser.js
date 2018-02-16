const {
  user: {
    findOneUser
  }
} = require('$service');

const {hash: {getHash}, err, resMsg} = require('$routeLib');

/**
 * Create Connection Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({params: {userId: id}, body}, res, next) => {
  try {
    const {hash, userName = 'NONE', userAge = 0, userEmail = 'NONE'} = body;

    const user = await findOneUser(undefined, {id});
    if (!user) err.notFoundUser();

    // 2차 hash 생성
    const secondHash = getHash(hash, user.serverSalt);
    user.hashToken = secondHash;
    user.userName = userName;
    user.userAge = userAge;
    user.userEmail = userEmail;

    const result = await user.save();
    console.log(result);

    resMsg.success201();
  } catch (e) {
    next(e);
  }
};

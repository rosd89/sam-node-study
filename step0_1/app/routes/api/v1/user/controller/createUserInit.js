const {
  user: {
    createUser
  }
} = require('$service');

const {hash: {getSalt}, resMsg} = require('$routeLib');

/**
 * Create Connection Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({body: {userId: id}}, res, next) => {
  try {
    const clientSalt = getSalt();
    const serverSalt = getSalt();

    // 유저데이터를 추가
    // return값은 clientSalt만 보냄
    const {clientSalt: salt} = createUser({id, clientSalt, serverSalt});

    resMsg.success200RetObj(res, {salt});
  } catch (e) {
    next(e);
  }
};
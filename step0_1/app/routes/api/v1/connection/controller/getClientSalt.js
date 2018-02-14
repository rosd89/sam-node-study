const {user: {findOneUser}} = require('$service');

const {hash: {getSalt}, resMsg} = require('$routeLib');

/**
 * Get ClientSalt Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({query: {userId: id}}, res, next) => {
  try {
    const user = await findOneUser(undefined, {id});

    if (!user) {
      resMsg.success200RetObj(res, {
        salt: getSalt()
      });
    }

    resMsg.success200RetObj(res, {
      salt: user.clientSalt
    });
  } catch (e) {
    next(e);
  }
};

const {user: {findOneUser}} = require('$service');

const {hash: {getSalt}, resMsg} = require('$routeLib');

module.exports = async ({query}, res, next) => {
  try {
    const {userId: id} = query;
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

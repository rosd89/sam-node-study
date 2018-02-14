const {
  user: {
    findOneUser
  }
} = require('$service');

const {err} = require('$routeLib');

/**
 * Create Connection Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({body: {userId: id}}, res, next) => {
  try {
    const user = await findOneUser(undefined, {id});

    if (!user) next();
    else err.duplicate('user');
  } catch (e) {
    next(e);
  }
};

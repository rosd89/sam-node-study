const {user: {findOneUser}} = require('$service');

const {err, retMsg} = require('$routeLib');

/**
 * Get User Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({params: {userId: id}}, res, next) => {
  try {
    const user = await findOneUser(
      ['id', 'userName', 'userAge', 'userEmail'],
      {id}
    );

    if (!user) err.noConnection();

    retMsg.success200RetObj(res, user);
  } catch (e) {
    next(e);
  }
};

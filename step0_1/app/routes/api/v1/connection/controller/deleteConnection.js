const {resMsg} = require('$routeLib');

/**
 * Delete Connection Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({query}, res, next) => {
  resMsg.tokenClear(res);
};

const {resMsg} = require('$routeLib');

/**
 * Delete Connection Controller
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (body, res) => {
  resMsg.tokenClear(res);
};

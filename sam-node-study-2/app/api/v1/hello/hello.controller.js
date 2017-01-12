const retMsg = require('../util/return.msg');
const hello = require('../../../../../public/hello/hello.json');

/**
 * hello 가져오기
 *
 * @param req
 * @param res
 */
exports.index = (req, res) => retMsg.success200RetObj(res, hello);
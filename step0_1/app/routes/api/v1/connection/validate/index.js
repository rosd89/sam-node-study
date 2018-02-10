const {validate} = require('$routeLib');
const rules = require('./rules');

/**
 * Connection 생성, 갱신 - 인자값 Validation 체크
 *
 * @param body
 * @param res
 * @param next
 */
exports.validConnection = async ({body}, res, next) => {
  try {
    await validate(body, rules.createConnection);
  } catch (e) {
    next(e);
  }
};

const {validate} = require('$routeLib');
const rules = require('./rules');

/**
 * User 생성 1단계 - 인자값 Validation 체크
 *
 * @param body
 * @param res
 * @param next
 */
exports.validCreateUserInit = async ({body}, res, next) => {
  try {
    await validate({body}, rules.createUserInit);
  } catch (e) {
    next(e);
  }
};

/**
 * User 생성 2단계 - 인자값 Validation 체크
 *
 * @param body
 * @param res
 * @param next
 */
exports.validCreateUser = async ({body}, res, next) => {
  try {
    await validate({body}, rules.createUser);
  } catch (e) {
    next(e);
  }
};

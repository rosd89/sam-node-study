const {rules: {userId, hash}} = require('$routeLib');

/**
 * Connection 생성 1단계 - Validation 규칙
 */
exports.createUserInit = {
  body: {userId}
};

/**
 * Connection 생성 2단계 - Validation 규칙
 */
exports.createUser = {
  body: {userId, hash}
};

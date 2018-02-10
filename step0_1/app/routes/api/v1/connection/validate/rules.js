const {rules: {userId, hash}} = require('$routeLib');

/**
 * Connection 생성 - Validation 규칙
 */
exports.createConnection = {
  body: {userId, hash}
};

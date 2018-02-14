const {
  MISSING_PARAM, INVALID_PARAM
} = require('../response/responseCode');

/**
 * userId - Parameter 규칙
 */
exports.userId = [
  {
    isValid: v => !!v,
    message: 'Missing Parameter',
    code: MISSING_PARAM
  }
];

/**
 * hash - Parameter 규칙
 */
exports.hash = [
  {
    isValid: v => !!v,
    message: 'Missing Parameter',
    code: MISSING_PARAM
  },
  {
    isValid: v => v.length === 64,
    message: 'Invalid Parameter',
    code: INVALID_PARAM
  }
];

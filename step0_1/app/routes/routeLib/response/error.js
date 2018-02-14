const {NO_CONNECTION, DUPLICATE} = require('./responseCode');

/**
 * Validation Mismatch - 인자 값이 유효하지 않음
 *
 * @param key
 * @param message
 */
exports.validationMismatch = (key, message, code) => {
  throw new Map([
    ['statusCode', 400],
    ['message', message],
    ['code', code],
    ['data', key]
  ]);
};

/**
 * Duplicate Data - 중복되는 정보
 *
 * @param key
 */
exports.duplicate = key => {
  throw new Map([
    ['statusCode', 400],
    ['message', 'Duplicate Data'],
    ['code', DUPLICATE],
    ['data', key]
  ]);
};

/**
 * Credential Mismatch - 인증정보가 일치하지 않음
 */
exports.credentialsMismatch = _ => {
  throw new Map([
    ['statusCode', 401],
    ['message', 'Credential Mismatch']
  ]);
};

/**
 * No Connection - 유저 접속기록이 없음
 */
exports.noConnection = _ => {
  throw new Map([
    ['statusCode', 401],
    ['message', 'No Connection'],
    ['code', NO_CONNECTION]
  ]);
};

/**
 * Not Found User - 유저 정보가 없음
 */
exports.notFoundUser = _ => {
  throw new Map([
    ['statusCode', 404],
    ['message', 'Not Found User']
  ]);
};

const error = require('../response/error');

/**
 * 인자 값 Valid 체크
 *
 * @param data
 * @param rules
 */
module.exports = (data, rules) => new Promise((resolve, reject) => {
  Object.keys(data).forEach(d => Object.keys(rules[d]).forEach(k => {
    rules[d][k].forEach(({isValid, message, code}) => {
      if (!isValid[d][k]) reject(error.validationMismatch(k, message, code));
    });
  }));

  resolve();
});

/**
 * Parameter Checker - Missing
 *
 * @param v
 */
exports.pcm = v => ({statusCode: 400, errorCode: 'ERROR_MISSING_PARAM', data: v});

/**
 * throw Parameter Checker - Missing
 *
 * @param v
 */
exports.tpcm = v => {
  throw this.pcm(v);
};

/**
 * Parameter Checker - Invalid
 *
 * @param v
 */
exports.pci = v => ({statusCode: 400, errorCode: 'ERROR_INVALID_PARAM', data: v});

/**
 * throw Parameter Checker - Invalid
 *
 * @param v
 */
exports.tpci = v => {
  throw this.pci(v);
};

/**
 * Parameter Checker - Duplicate
 *
 * @param v
 */
exports.pcd = v => ({statusCode: 400, errorCode: 'ERROR_DUPLICATE', data: v});

/**
 * throw Parameter Checker - Duplicate
 *
 * @param v
 */
exports.tpcd = v => {
  throw this.pcd(v);
};

/**
 * Parameter Checker - No Connection
 *
 * @param _
 */
exports.pcc = _ => ({statusCode: 400, errorCode: 'ERROR_NO_CONNECTION'});

/**
 * throw Parameter Checker - No Connection
 *
 * @param _
 */
exports.tpcc = _ => {
  throw this.pcc();
};

/**
 * Parameter Checker
 *
 * @param errorCode
 * @param data
 */
exports.pc = (errorCode, data) => ({statusCode: 400, errorCode, data});

/**
 * throw Parameter Checker
 *
 * @param errorCode
 * @param data
 */
exports.tpc = (errorCode, data) => {
  throw this.pc(errorCode, data);
};

/**
 * 401 Unauthorized
 *
 * @param _
 */
exports.u = _ => ({statusCode: 401});

/**
 * throw 401 Unauthorized
 *
 * @param _
 */
exports.tu = _ => {
  throw this.u();
};

/**
 * 403 Forbidden
 *
 * @param _
 */
exports.f = _ => ({statusCode: 403});

/**
 * throw 403 Forbidden
 *
 * @param _
 */
exports.tf = _ => {
  throw this.f();
};

/**
 * 404 Not Found
 *
 * @param _
 */
exports.nf = _ => ({statusCode: 404});

/**
 * throw 404 Not Found
 *
 * @param _
 */
exports.tnf = _ => {
  throw this.nf();
};

/**
 * json validation
 *
 * @param v
 * @returns {boolean}
 */
exports.jsonValidation = v => {
  try {
    return JSON.parse(v);
  }
  catch (e) {
    return false;
  }
};

/**
 * undefined 체크
 *
 * @param v
 */
exports.isUndefined = v => v === undefined;
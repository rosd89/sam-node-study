const errorCodeMap = {
  // Client ErrorCode
  ERROR_UNKNOWN: 0,
  ERROR_MISSING_PARAM: -1,
  ERROR_INVALID_PARAM: -2,
  ERROR_DUPLICATE: -3,
  ERROR_INVALID_ACCESS_TOKEN: -6,
  ERROR_NO_CONNECTION: -7,
};

// 400 - 인자값 누락
exports.error400InvalidCall = (res, errorCode, data) => {
  const resBody = {
    errorCode: errorCodeMap[errorCode],
    data: data
  };

  res.body = JSON.stringify(resBody);
  return res.status(400).json(resBody);
};

// 401 - 리소스 접근권한 없음
exports.error401Unauthorized = res => res.status(401).json({});

// 403 - 리소스 접근권한 만료
exports.error403Expired = res => res.status(403).json({});

// 404 - 리로스 없음
exports.error404NotFound = res => res.status(404).json({});

module.exports = (err, req, res, next) => {
  const {statusCode, errorCode, data} = err;
  if (statusCode === 400) {
    return this.error400InvalidCall(res, errorCode, data);
  }
  else if (statusCode === 401) {
    return this.error401Unauthorized(res);
  }
  else if (statusCode === 403) {
    return this.error403Expired(res);
  }
  else if (statusCode === 404) {
    return this.error404NotFound(res);
  }
  else{
    console.log(err);
    return this.error404NotFound(res);
  }
};
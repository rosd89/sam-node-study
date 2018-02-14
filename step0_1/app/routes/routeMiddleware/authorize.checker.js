const {findOneConnection} = require('$service');

const {
  hash: {getExpiredTime},
  code: {MISSING_PARAM, INVALID_PARAM},
  err, validate
} = require('$routeLib');

/**
 * 인증키 확인 Middleware
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async ({cookies}, res, next) => {
  try {
    await validate({cookies}, {
      cookies: {
        accessToken: [
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
        ]
      }
    });

    const {accessToken} = cookies;
    const connection = await findOneConnection({accessToken});
    if (!connection) err.noConnection();

    const timeNum = connection.expiredTime.getTime() - new Date().getTime();
    if (timeNum < 0) err.expiredToken();

    // 인증시간 갱신
    connection.expiredTime = getExpiredTime();
    await connection.save();

    next();
  } catch (e) {
    next(e);
  }
};

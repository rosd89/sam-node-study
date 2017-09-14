const {getExpiredTime} = require('../util/hash.creator');
const {tpcm, tpci, pcc, f} = require('./param.checker');

const {findOneAdminConnection} = require('../service/connect.service');

/**
 * Admin 인증키 체크 controller
 *
 * @param req
 * @param res
 * @param next
 */
exports.adminAuthCheck = (req, res, next) => {
  let accessToken = req.body.accessToken || req.query.accessToken || req.params.accessToken;
  if (!accessToken && req.fields) {
    accessToken = req.fields.accessToken;
  }

  if (!accessToken) tpcm('accessToken');
  else if (accessToken.length !== 64) tpci('accessToken');

  findOneAdminConnection({accessToken}).then(connection => {
    if (!connection) return next(pcc());

    const timeNum = connection.expiredTime.getTime() - new Date().getTime();
    if (timeNum < 0) return next(f());

    //인증시간 갱신
    connection.expiredTime = getExpiredTime();
    connection.save().then(connection => {
      //console.log('expired time refresh = ' + connection.dataValues.expiredTime);
    });

    req.body.connectUserId = connection.userId;

    next();
  });
};
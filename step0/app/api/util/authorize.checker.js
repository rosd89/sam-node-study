const {getExpiredTime} = require('../util/hash.creator');
const {tpcm, tpci, pcc, f} = require('./param.checker');

const {findOneConnection} = require('../service/connect.service');

/**
 * 인증키 체크 Middleware
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  let accessToken = req.body.accessToken || req.query.accessToken || tpcm('accessToken');
  if (accessToken.length !== 64) tpci('accessToken');

  findOneConnection({accessToken}).then(connection => {
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
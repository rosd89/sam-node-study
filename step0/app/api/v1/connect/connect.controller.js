const co = require('co');

const retMsg = require('../../util/return.msg.js');
const {getSalt, getHash, getExpiredTime} = require('../../util/hash.creator');
const {tpcm, tpci, tpcc, tnf, tu} = require('../../util/param.checker');

const {findOneUser} = require('../../service/user.service');
const {findOneConnection, createConnection, destroyConnection} = require('../../service/connect.service');

/**
 * clientSalt 가져오기 Controller
 *
 * @param req
 * @param res
 */
exports.getClientSalt = (req, res) => co(function* () {
  const {userId: id} = req.query;
  const user = yield findOneUser(undefined, {id});

  if (!user) {
    return retMsg.success200RetObj(res, {
      salt: getSalt()
    });
  }

  return retMsg.success200RetObj(res, {
    salt: user.clientSalt
  })
});

/**
 * 로그인 인증 확인 Middleware
 *
 * @param req
 * @param res
 * @param next
 */
exports.loginValidation = (req, res, next) => co(function* () {
  const {userId: id = tpcm('userId'), hash: hash1st = tpcm('hash')} = req.body;
  if (hash1st.length === '64') tpci('hash');

  const user = yield findOneUser(undefined, {id});

  if (!user) tnf();

  const {serverSalt, hashToken} = user;
  const hash2nd = getHash(hash1st, serverSalt);
  if (hashToken !== hash2nd) tu();

  return next();
}).catch(err => {
  console.log(err);
  next(err);
});

/**
 * 로그인 Controller
 *
 * @param req
 * @param res
 */
exports.create = (req, res) => co(function* () {
  const {userId} = req.body;

  yield destroyConnection({userId});
  const {accessToken} = yield createConnection({
    userId,
    accessToken: getSalt(),
    expiredTime: getExpiredTime()
  });

  return retMsg.success200RetObj(res, {accessToken});
});

/**
 *  로그인 갱신 Controller
 *
 * @param req
 * @param res
 * @param next
 */
exports.update = (req, res, next) => co(function* () {
  const {userId} = req.body;
  const connection = findOneConnection({userId});

  if(!connection) tpcc();

  // 인증정보 갱신
  const accessToken = getSalt();
  connection.accessToken = accessToken;
  connection.expiredTime = getExpiredTime();

  yield connection.save();

  retMsg.success200RetObj(res, {accessToken});
}).catch(err => {
  console.log(err);
  next(err);
});

/**
 * 로그아웃 Controller
 *
 * @param res
 * @param req
 */
exports.destroy = (req, res) => co(function* () {
  const {accessToken} = req.body;
  const result = yield destroyConnection({accessToken});

  retMsg.success204(res);
});
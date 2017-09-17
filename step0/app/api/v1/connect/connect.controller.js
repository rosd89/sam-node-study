const retMsg = require('../../util/return.msg.js');
const {getSalt, getHash, getExpiredTime} = require('../../util/hash.creator');

const {tpcm, tpci, pcc, nf, u} = require('../../util/param.checker');

const {findOneUser} = require('../../service/user.service');
const {findOneConnection, createConnection, destroyConnection} = require('../../service/connect.service');

/**
 * clientSalt 가져오기 Controller
 *
 * @param req
 * @param res
 */
exports.getClientSalt = (req, res) => {
  const {userId: id} = req.query;
  if (!id) tpcm('userId');

  findOneUser(undefined, {id}).then(user => {
    // getSalt 정책
    //   - 리턴값은 결과값이 성공일 때와 동일한 형태로 전송
    if (!user) {
      return retMsg.success200RetObj(res, {
        salt: getSalt()
      });
    }

    return retMsg.success200RetObj(res, {
      salt: user.clientSalt
    });
  });
};

/**
 * 로그인 인증 확인 Middleware
 *
 * @param req
 * @param res
 * @param next
 */
exports.loginValidation = (req, res, next) => {
  const {userId: id = tpcm('userId'), hash: hash1st = tpcm('hash')} = req.body;
  if (hash1st.length !== 64) tpci('hash');

  findOneUser(undefined, {id}).then(user => {
    if (!user) return next(nf());

    const {serverSalt, hashToken} = user;
    const hash2nd = getHash(hash1st, serverSalt);
    if (hashToken !== hash2nd) return next(u());

    return next();
  });
};

/**
 * 로그인 Controller
 *
 * @param req
 * @param res
 */
exports.create = ({body: {userId}}, res) => destroyConnection({userId})
  .then(_ => createConnection({
    userId,
    accessToken: getSalt(),
    expiredTime: getExpiredTime()
  }))
  .then(({accessToken}) => retMsg.success200RetObj(res, {accessToken}));

/**
 *  로그인 갱신 Controller
 *
 * @param req
 * @param res
 */
exports.update = ({body: {userId}}, res, next) => findOneConnection({userId})
  .then(connection => {
    if (!connection) return next(pcc());

    // 인증정보 추가
    connection.accessToken = getSalt();
    connection.expiredTime = getExpiredTime();

    connection.save()
      .then(_ => retMsg.success200RetObj(res, {accessToken}));
  });

/**
 * 로그아웃 Controller
 *
 * @param res
 * @param req
 */
exports.destroy = ({body: {accessToken}}, res) => destroyConnection({accessToken})
  .then(_ => retMsg.success204(res));
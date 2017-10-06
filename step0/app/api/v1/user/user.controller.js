const co = require('co');

const retMsg = require('../../util/return.msg');
const {getSalt, getHash} = require('../../util/hash.creator');
const {tpcm, tpci, tpcd, nf, tnf} = require('../../util/param.checker');

const {findOneUser, createUser} = require('../../service/user.service');

/**
 * 유저 정보 조회 Controller
 *
 * @param req
 * @param res
 * @param next
 */
exports.index = ({params: {userId: id}, res, next}) => co(function* () {
  const user = yield findOneUser(
    ['id', 'userName', 'userAge', 'userEmail'],
    {id}
  );

  if (!user) return next(nf());

  return retMsg.success200RetObj(res, user);
});

/**
 * 유저 등록 init Controller
 *
 * @param req
 * @param res
 */
exports.init = (req, res) => {
  const {userId: id} = req.body;

  const clientSalt = getSalt();
  const serverSalt = getSalt();

  // 유저데이터를 추가
  // return값은 clientSalt만 보냄

  const {clientSalt: salt} = createUser({id, clientSalt, serverSalt});

  return retMsg.success200RetObj(res, {salt});
};

/**
 * 유저 등록 create Controller
 *
 * @param req
 * @param res
 */
exports.create = (req, res, next) => co(function* () {
  const {userId: id} = req.params;

  const {
    hash = tpcm('hash'),
    userName = 'NONE',
    userAge = 0,
    userEmail = 'NONE'
  } = req.body;

  // hash 정보체크
  // 유저정보는 선택사항이기 때문에 입력값이 없으면 정보없음으로 처리
  // 단 나이정보는 intteger이기 때문에 0으로 처
  if (hash.length === '64') tpci('hash');

  const user = yield findOneUser(undefined, {id});

  if(!user) tnf()

  // 2차 hash 생성
  const secondHash = getHash(hash, user.serverSalt);

  user.hashToken = secondHash;
  user.userName = userName;
  user.userAge = userAge;
  user.userEmail = userEmail;

  const result = yield user.save();
  console.log(result);

  return retMsg.success201(res);
}).catch(err => {
  console.log(err);
  next(err);
});

/**
 * 유저 ID 중복체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.duplicationCheckByUser = (req, res, next) => co(function* () {
  const {userId: id = tpcm('userId')} = req.body;
  const user = yield findOneUser(undefined, {id});

  if(!user) return next();

  next(tpcd('userId'));
}).catch(err => {
  console.log(err);
  next(err);
});
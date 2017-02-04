const retMsg = require('../util/return.msg');
const hash = require('../util/hash.creator');

const UserInfo = require('../../../models').UserInfo;

/**
 * 유저 등록 init
 *
 * @param req
 * @param res
 */
exports.init = (req, res) => {
    const userId = req.body.userId;

    const clientSalt = hash.getSalt();
    const serverSalt = hash.getSalt();

    // 유저데이터를 추가
    // return값은 clientSalt만 보냄
    UserInfo.create({
        id: userId,
        clientSalt: clientSalt,
        serverSalt: serverSalt
    }).then(user => retMsg.success200RetObj(res, {salt: user.clientSalt}
    )).catch(err => retMsg.error500Server(res, err));
};

/**
 * 유저 등록 create
 *
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    const userId = req.params.userId;

    const {
        hash,
        userName = 'NONE',
        userAge = 0,
        userEmail = 'NONE'
    } = req.body;

    // hash 정보체크
    // 유저정보는 선택사항이기 때문에 입력값이 없으면 정보없음으로 처리
    // 단 나이정보는 intteger이기 때문에 0으로 처
    if (!hash) {
        return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'hash');
    }
    else if (hash.length === '64') {
        return retMsg.error400InvalidCall(res, 'ERROR_INVALID_PARAM', 'hash');
    }

    UserInfo.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        if (!user) {
            return retMsg.error404NotFound(res);
        }

        // 2차 hash 생성
        const secondHash = hash.getHash(hash, user.clientSalt);

        user.hashToken = secondHash;
        user.userName = userName;
        user.userAge = userAge;
        user.userEmail = userEmail;

        // 변경된 값 저장
        user.save
            .then(result => retMsg.success201(res))
            .catch(err => retMsg.error500Server(res, err));
    });
};
const {userConnection} = require('../index');

/**
 * 유저 접속 기록 조회 Service
 *
 * @param where
 */
exports.findOneConnection = where => userConnection.findOne({where});

/**
 * 유저 접속 기록 추가 Service
 *
 * @param connect
 */
exports.createConnection = connect => userConnection.create(connect);

/**
 * 유저 접속 기록 삭제 Service
 *
 * @param where
 */
exports.destroyConnection = where => userConnection.destroy({where});

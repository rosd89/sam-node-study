const {sequelize, UserConnectInfo} = require('../../models');

/**
 * 유저 접속 기록 조회 Service
 *
 * @param where
 */
exports.findOneConnection = where => UserConnectInfo.findOne({where});

/**
 * 유저 접속 기록 추가 Service
 *
 * @param connect
 */
exports.createConnection = connect => UserConnectInfo.create(connect);

/**
 * 유저 접속 기록 삭제 Service
 *
 * @param where
 */
exports.destroyConnection = where => UserConnectInfo.destroy({where});
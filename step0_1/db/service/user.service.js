const {user} = require('../index');

/**
 * 유저 정보 조회 Service
 *
 * @param where
 */
exports.findOneUser = (attributes, where) => user.findOne({attributes, where});

/**
 * 유저 정보 추가 Service
 *
 * @param user
 */
exports.createUser = obj => user.create(obj);

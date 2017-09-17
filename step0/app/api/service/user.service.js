const {UserInfo} = require('../../models');

/**
 * 유저 정보 조회 Service
 *
 * @param where
 */
exports.findOneUser = (attributes, where) => UserInfo.findOne({attributes, where});

/**
 * 유저 정보 추가 Service
 *
 * @param user
 */
exports.createUser = user => UserInfo.create(user);
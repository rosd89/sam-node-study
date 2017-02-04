const db = require('./model/mysql.connection');

/**
 * MODEL
 */
const UserInfo = require('./model/userInfo');

module.exports = {
    db: db,
    UserInfo: UserInfo
};
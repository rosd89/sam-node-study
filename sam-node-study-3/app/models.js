const db = require('./model/mysql.connection');

/**
 * MODEL
 */
const UserInfo = require('./model/userInfo');
const UserConnectInfo = require('./model/userConnectInfo');

UserInfo.hasOne(UserConnectInfo, {
   foreignKey: 'userId',
    constraints: false
});

UserConnectInfo.belongsTo(UserInfo, {
    foreignKey: 'userId',
    constraints: false
});

module.exports = {
    db: db,
    UserInfo: UserInfo,
    UserConnectInfo: UserConnectInfo
};
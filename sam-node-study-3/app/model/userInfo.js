const sequelize = require('sequelize');
const db = require('./mysql.connection');

/**
 *  Table: userInfo
 *
 *  id: 유저 ID - pk
 *
 *  serverSalt: 2차 Hash를 만들기 위한 salt 값
 *  clientSalt: 1차 Hash를 만들기 위한 salt 값
 *  hashToken: 2차 Hash
 *
 *  userName: 유저이름
 *  userAge: 유저나이
 *  userEmail: 유저 이메일 주소
 *
 * @type {*}
 */
const UserInfo = db.define('userInfo',
    {
        id: {
            type: sequelize.STRING(45),
            primaryKey: true
        },
        serverSalt: sequelize.CHAR(64),
        clientSalt: sequelize.CHAR(64),
        hashToken: sequelize.CHAR(64),
        userName: sequelize.STRING(32),
        userAge: sequelize.INTEGER,
        userEmail: sequelize.STRING
    },
    {
        tableName: 'userInfo'
    }
);

module.exports = UserInfo;
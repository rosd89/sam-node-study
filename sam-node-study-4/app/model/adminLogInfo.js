const sequelize = require('sequelize');
const db = require('./mysql.connection');

/**
 * ADAMIN 변경 내역 로그 테이블
 *
 * id: pk
 *
 * logTarget: 변경된 테이블
 * editType
 * logData: 변경된 로그 정보
 *
 * @type {*}
 */
const AdminLogInfo = db.define('adminLogInfo',
    {
        logTarget: sequelize.STRING(32),
        editType: {
            type: sequelize.ENUM,
            values: [
                'modified', 'added', 'deleted'
            ]
        },
        logData: sequelize.JSON
    },
    {
        updatedAt: false,
        tableName: 'adminEditLogInfo'
    }
);

module.exports = AdminLogInfo;
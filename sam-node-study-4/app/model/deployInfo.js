const sequelize = require('sequelize');
const db = require('./mysql.connection');

const DeployInfo = db.define('deployInfo',
    {
        deployTarget: sequelize.STRING(32),
        deployData: sequelize.JSON,
        deployMemo: sequelize.STRING
    },
    {
        updatedAt: false,
        tableName: 'deployInfo'
    }
);

module.exports = DeployInfo;
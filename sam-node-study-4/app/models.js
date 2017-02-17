const db = require('./model/mysql.connection');

/**
 * MODEL
 */
const FaqInfo = require('./model/faqInfo');
const FaqDeployInfo = require('./model/faqDeployInfo');
const AdminLogInfo = require('./model/adminLogInfo');
const DeployInfo = require('./model/deployInfo');

DeployInfo.hasMany(FaqDeployInfo, {
    foreignKey: 'deployId',
    constraints: false
});

FaqDeployInfo.belongsTo(DeployInfo, {
    foreignKey: 'deployId',
    constraints: false
});


module.exports = {
    db,
    FaqInfo,
    FaqDeployInfo,
    AdminLogInfo,
    DeployInfo
};
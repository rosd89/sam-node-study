const db = require('./model/mysql.connection');

/**
 * MODEL
 */
const FaqInfo = require('./model/faqInfo');
const FaqDeployInfo = require('./model/faqDeployInfo');

FaqInfo.hasMany(FaqDeployInfo, {
    foreignKey: 'faqId',
    constraints: false
});

FaqDeployInfo.belongsTo(FaqInfo, {
    foreignKey: 'faqId',
    constraints: false
});


module.exports = {
    db,
    FaqInfo,
    FaqDeployInfo
};
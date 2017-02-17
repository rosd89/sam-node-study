const sequelize = require('sequelize');
const db = require('./mysql.connection');

const FaqDeployInfo = db.define('faqDeployInfo',
    {
        faqId: {
            type: sequelize.INTEGER,
            references: {
                model: 'faqInfo',
                key: 'id'
            }
        },
        faqTitle: sequelize.STRING,
        faqContents: sequelize.TEXT,
        editType: {
            type: sequelize.ENUM,
            values: [
                'modified', 'added', 'deleted'
            ]
        },
        faqStatus: {
            type: sequelize.ENUM,
            values: [
                'active', 'pending', 'delete'
            ]
        },
        orderNo: sequelize.INTEGER,
        uEnable: sequelize.INTEGER
    },
    {
        updatedAt: false,
        tableName: 'faqDeployInfo'
    }
);

module.exports = FaqDeployInfo;
const sequelize = require('sequelize');
const db = require('./mysql.connection');

const FaqInfo = db.define('faqInfo',
    {
        faqTitle: sequelize.STRING,
        faqContents: sequelize.TEXT,
        editType: {
            type: sequelize.ENUM,
            values: [
                'noaction', 'modified', 'added', 'deleted'
            ]
        },
        orderNo: sequelize.INTEGER,
        uEnable: sequelize.INTEGER
    },
    {
        tableName: 'faqInfo'
    }
);

module.exports = FaqInfo;
const sequelize = require('sequelize');
const db = require('./mysql.connection');

/**
 * FAQ 배포 테이블
 *
 * id: pk
 *
 * faqId; faq id
 * faqTitle: FAQ 제목
 * faqContests: FAQ 내용
 * editType
 * faqStatus
 * faqEnable
 *
 * createdAt: 배포 정보 생성일
 *
 * @type {*}
 */
const FaqDeployInfo = db.define('faqDeployInfo',
    {
        deployId: {
            type: sequelize.INTEGER,
            references: {
                model: 'deployInfo',
                key: 'id'
            }
        },
        faqId: sequelize.INTEGER,
        faqTitle: sequelize.STRING,
        faqContents: sequelize.TEXT,
        faqEditType: {
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
        faqEnable: sequelize.INTEGER
    },
    {
        updatedAt: false,
        tableName: 'faqDeployInfo'
    }
);

module.exports = FaqDeployInfo;
const sequelize = require('sequelize');
const db = require('./mysql.connection');

/**
 * FAQ EDIT 테이블
 *
 * id : pk
 *
 * faqTitle: FAQ 제목
 * faqContests: FAQ 내용
 * editType
 * orderNo: FAQ 순서
 * faqEnable
 *
 * createdAt: 생성일
 * updatedAt: 마지막 업데이트 날짜
 *
 * @type {*}
 */
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
        faqEnable: sequelize.INTEGER
    },
    {
        tableName: 'faqInfo'
    }
);

module.exports = FaqInfo;
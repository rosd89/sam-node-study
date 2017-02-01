const models = require('../app/models');

/*
 force : true  서버 재시작시 데이터 초기화
 false 서버 재시작시 데이터 유지
 */
module.exports = () => {
    return models.db.sync({force: false})
};
const AdminLogInfo = require('../../../../models').AdminLogInfo;

/**
 * 데이터 추가 수정 내역 등을 저장
 *
 * @param logTarget
 * @param editType
 * @param logData
 */
const adminWriteLog = (logTarget, editType, logData) => AdminLogInfo.create(
    logTarget,
    editType,
    logData
);
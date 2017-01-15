const fs = require('fs');

const dir = require('../util/directory.path').dir;
const retMsg = require('../util/return.msg');
const hello = require('../../../../../public/hello/hello.json');

/**
 * hello 가져오기
 *
 * @param req
 * @param res
 */
exports.index = (req, res) => {
    res.header('Last-Modified', hello.modifiedTime.toUTCString());

    return retMsg.success200RetObj(res, hello);
};

/**
 * hello 수정하기
 *
 * @param req
 * @param res
 */
exports.update = (req, res) => {
    let {status, appVersion, retryCount} = req.body;

    // missing check
    if(!status) return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'status');
    else if(!appVersion) return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'appVersion');
    else if(!retryCount) return retMsg.error400InvalidCall(res, 'ERROR_MISSING_PARAM', 'retryCount');

    status = retMsg.jsonValidation(status);
    appVersion = retMsg.jsonValidation(appVersion);
    retryCount = parseInt(retryCount);

    // Invalid check
    if(!status) return retMsg.error400InvalidCall(res, 'ERROR_INVALID_PARAM', 'status');
    else if(!appVersion) return retMsg.error400InvalidCall(res, 'ERROR_INVALID_PARAM', 'appVersion');
    else if(isNaN(retryCount)) return retMsg.error400InvalidCall(res, 'ERROR_INVALID_PARAM', 'retryCount');

    const modifiedTime = new Date().getTime();
    const path = `${dir}/public/hello/hello.json`;
    const output = JSON.stringify({
        status: status,
        appVersion: appVersion,
        retryCount: retryCount,
        modifiedTime: modifiedTime
    });

    fs.writeFile(path, output, 'utf-8', (err) => {
        hello.status = status;
        hello.appVersion = appVersion;
        hello.retryCount = retryCount;
        hello.modifiedTime = new Date(modifiedTime);

        return retMsg.success200(res);
    });
};
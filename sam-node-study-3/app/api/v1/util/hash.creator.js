const crypto = require('crypto');
const uuid = require('node-uuid');

/**
 * salt값 생성
 *
 * @param _
 */
exports.getSalt = _ => crypto.createHash('sha256').update(uuid.v1()).digest('hex');

/**
 * hash값 생성
 *
 * @param hash
 * @param salt
 */
exports.getHash = (hash, salt) => crypto.pbkdf2Sync(hash, salt, 10000, 32, 'sha256').toString('hex');

/**
 * 인증만료시간 생성
 *
 * @param _
 */
exports.getExpiredTime = _ => {
    const expiredTime = new Date();
    return expiredTime.setMinutes(expiredTime.getMinutes() + 120);
};
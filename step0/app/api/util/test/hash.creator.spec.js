require('should');

const crypto = require('crypto');
const uuid = require('node-uuid');

const {getSalt, getHash, getExpiredTime} = require('../hash.creator');

describe('암호화 모듈 테스트', _ => {
  const testData_pass = 'password';
  const testData_salt = 'ee90b870f73fd520876367d467e8cff89742e0ab606334a9853b7b87e0c79084';
  const testData_hash = '6ae62531db312043b335a025f8898a3e05fb5985398be5e56c02cbc3c35f6457';

  it('암호화 모듈 테스트 1 - uuid 생성', () => {
    uuid.v1().length.should.be.equal(36);
  });

  it('암호화 모듈 테스트 2 - slat 생성', () => {
    const salt = crypto.createHash('sha256').update(uuid.v1()).digest('hex');
    salt.length.should.be.equal(64);
  });

  it('암호화 모듈 테스트 3 - getSlat 함수 테스트', () => {
    const salt = getSalt();
    salt.length.should.be.equal(64);
  });

  it('암호화 모듈 테스트 4 - hash 생성', () => {
    const hash = crypto.pbkdf2Sync(testData_pass, testData_salt, 10000, 32, 'sha256').toString('hex');
    hash.length.should.be.equal(64);
    hash.should.be.equal(testData_hash);
  });

  it('암호화 모듈 테스트 5 - getHash 함수 테스트', () => {
    const hash = getHash(testData_pass, testData_salt);
    hash.length.should.be.equal(64);
    hash.should.be.equal(testData_hash);
  });

  it('암호화 모듈 테스트 6 - expired Time 생성', () => {
    const expiredTime = new Date();
    const thisTime = expiredTime.getTime();
    expiredTime.setMinutes(expiredTime.getMinutes() + 120);

    (expiredTime.getTime() - thisTime).should.be.equal(1000 * 60 * 60 * 2);
  });

  it('암호화 모듈 테스트 7 - getExpiredTime 함수 테스트', () => {
    const expiredTime = getExpiredTime();

    (expiredTime - Date.now()).should.be.lessThanOrEqual(1000 * 60 * 60 * 2);
  });
});
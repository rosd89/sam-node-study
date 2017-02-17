const hash = require('../api/v1/util/hash.creator');

const password = '1111';
const clientSalt = '3b3b42a895069c5b38a9720e6a3eeca9b5297dd6baabaaa9bbf6845b772af7a3';

console.log(`1차 HASH = ${hash.getHash(password, clientSalt)}`);
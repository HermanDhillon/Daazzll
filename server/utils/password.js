const crypto = require('crypto');
 // TODO: convert to  bcrypt

function hashifier(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let hashedPass = crypto.pbkdf2Sync(password, salt, 150000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: hashedPass,
    };
}

function validatePass(password, hash, salt) {
    let verifyHash = crypto.pbkdf2Sync(password, salt, 150000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}

module.exports = {
    hashifier,
    validatePass,
};
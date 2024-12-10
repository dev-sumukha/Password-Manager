const crypto = require('crypto');

module.exports.generateKey = function(length){
    return crypto.randomBytes(length).toString('hex');
}
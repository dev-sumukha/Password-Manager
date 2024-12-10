const Crypto = require('crypto-js');

module.exports.encryptUserKey = (userKey)=>{
    return Crypto.AES.encrypt(userKey,process.env.MASTER_KEY);
}

module.exports.decryptUserKey = (userCipherKey)=>{
    return Crypto.AES.decrypt(userCipherKey,process.env.MASTER_KEY).toString(Crypto.enc.Utf8);
}

module.exports.encryptPassword = (plainPassword,userKey)=>{
    return Crypto.AES.encrypt(plainPassword,userKey);
}

module.exports.decryptPassword = (cipherPassword,userKey) =>{
    return Crypto.AES.decrypt(cipherPassword,userKey).toString(Crypto.enc.Utf8);
}
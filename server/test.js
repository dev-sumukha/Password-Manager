const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');


async function hashKey(key){
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashedKey = await bcrypt.hash(key,saltRound);
        
        console.log(hashedKey);
    }catch(err){
        console.log('error');
    }
}

async function comparePassword(givenKey){
    const res = await bcrypt.compare(key,givenKey);
    console.log(res);
}

// hashKey(key);
// comparePassword('$2a$10$amlYXgFMNqHYv2tgRkKONOGlWBlY/P9N3DX6LH6hubAm215gQABYy',key);

const key = 'PES'; // Incorrect key for testing
hashKey(key);

const encrypt = CryptoJS.AES.encrypt('Sumukha', key);
console.log('Encrypted:', encrypt.toString());

const decrypt = CryptoJS.AES.decrypt(encrypt.toString(), key);
const decryptedText = decrypt.toString(CryptoJS.enc.Utf8);

if (!decryptedText) {
  console.log('Key is incorrect');
} else {
  console.log('Decrypted:', decryptedText);
}



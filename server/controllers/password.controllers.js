const Password = require('../models/passwords.models');
const User = require('../models/user.models');
const { decryptUserKey, decryptPassword } = require('../utils/encryption.utils');

module.exports.addPassword = async (req,res)=>{
    const { website,password } = req.body;
    
    try {
        const user = await User.findById(req.user._id);
        const newPassword = await Password.create({website,password,createdBy:req.user._id});
    
        user.passwords.push(newPassword._id);
        await user.save();
        
        res.status(200).json({newPassword});
    } catch (error) {
        console.log('Error : ',error.message);
    }
}

module.exports.showPasswords = async (req,res)=>{
    const { key } = req.body;

    // read the key from the user
    // decrypt the encrypted key which is stored in the database using the MASTER KEY
    // compare both if both are same then decrypt all the passwords one by one and send to user

    try {
        const user = await User.findById(req.user._id);

        const decryptedUserKey = decryptUserKey(user.key);

        if(decryptedUserKey === key){
            // key matches with key stored in the database and given by user
            // encrypting all the passwords stored in the database
            const userPasswords = await User.findById(req.user._id).populate('passwords');
            const passwordsList = userPasswords.passwords;

            const decryptedPasswords = passwordsList.map((e) => ({
                ...e._doc, // Spread other fields of the password object
                password: decryptPassword(e.password, key) // Replace encrypted password with decrypted one
            }));

            res.status(200).json({decryptedPasswords});
        } else {
            res.status(401).json({message: 'key is invalid'});
        }
    } catch (error) {
        console.log('Error ',error.message);
    }
}

module.exports.getPasswords = async(req,res)=>{
    try {
        const userId = req.user._id

        const passwordList = await User.findById(userId).populate('passwords');
        res.status(200).json({passwordList});
    } catch (error) {
        console.log('Error ',error.message);
    }
}
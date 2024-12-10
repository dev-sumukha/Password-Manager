const mongoose = require('mongoose');
const User = require('./user.models');
const { decryptUserKey, encryptPassword } = require('../utils/encryption.utils');

const passwordSchema = new mongoose.Schema(
    {
        website:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },{timestamps: true}
);

passwordSchema.pre('save',async function(req,res,next){
    if(!this.isModified('password')){
        next();
    }

    try {
        // here we don't have direct access to the req and res
        // therefore by using the 'this' keyword I am accessing
        // In order to access the user_id I am using the 'createdBy' which I mentioned in the schema
        
        const user = await User.findById(this.createdBy);
        
        // decrypting the user key to encrypt the passwords
        const userKey = decryptUserKey(user.key);

        // encrypting the password using the user-key
        const userEncryptedPassword = encryptPassword(this.password,userKey);
        
        // updating the password field with the encrypted password
        this.password = userEncryptedPassword;
    } catch (error) {
        console.log('Error ',error.message);
    }
});

const Password = mongoose.model('Password',passwordSchema);
module.exports = Password;
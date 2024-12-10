const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { encryptUserKey } = require('../utils/encryption.utils')

const userSchema = new mongoose.Schema(
    {   
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        mobileNumber:{
            type: Number,
            required: true,
            unique: true
        },
        profilePicUrl:{
            type: String
        },
        password:{
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true,
            enum:['Male','Female','Other']
        },
        key:{
            type: String,
        },
        passwords:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Password'
        }]
    },{timestamps: true}
);


userSchema.pre('save',async function(next){
    if((!this.isModified('password')) || (!this.isModified('key'))){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(this.password,saltRound);

        // hashing master key and the password
        this.password = hashedPassword;
        // console.log(this.key);

        this.key = encryptUserKey(this.key);
        // console.log(this.key);
    } catch(error) {
        next(e);
    }
});

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({_id: this._id},process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.log('failed to create token');
    }
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.compareKey = function(key){
    return bcrypt.compareSync(key,this.key);
}

const User = mongoose.model('User',userSchema);
module.exports = User;
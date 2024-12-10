const User = require('../models/user.models');
const uploadOnCloudinary = require('../utils/cloudinary.utils');
const { decryptUserKey } = require('../utils/encryption.utils');

module.exports.register = async (req, res, next) => {
    const { username, email, mobileNumber, password, gender, key,profilePicUrl } = req.body;
    console.log(req.body);
    try {
        const userExist = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });
        // 409 - conflict status code 

        if (userExist) {
            console.log('user Exists');
            return res.status(409).json({ message: 'user exists' });
        }

        const profilePicLocalPath = req?.file?.path;
        const result = await uploadOnCloudinary(profilePicLocalPath);
        
        const user = await User.create({ username, email, mobileNumber, password, gender, profilePicUrl:result, key });
        // console.log(user);

        res.status(200).json({ user,userId: user._id, token: await user.generateToken() });
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const userExist = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!userExist) {
            return res.status(404).json({ message: 'user not found' });
        }

        const isPasswordCorrect = await userExist.comparePassword(password);

        if (isPasswordCorrect) {
            const token = await userExist.generateToken();
            res.status(200).json({ message: 'login succesfull', token });
        } else {
            res.status(400).json({ message: 'user credentials are not correct' });
        }
    } catch (error) {
        console.log('internal server error ', error);
    }
}

module.exports.profile = async function (req, res) {
    const token = req.user;

    try {
        if (token) {
            // if you give (token) directly it will automatically destructure it
            // if you give token._id then ({_id:token._id}) is must and should, if u just give 'id' it will give error

            const user = await User.findById({ _id: token._id }).select('-password');
            // const originalKey = decryptUserKey(user.key);
            console.log(user);
            return res.status(200).json({ user:user });
        } else {
            return res.json({ message: 'user unauthorised' });
        }
    } catch (error) {
        console.error('error : ',error.message);
    }
}

module.exports.showKey = async (req, res) => {
    const { enteredKey } = req.body;
    
    try {
        const user = await User.findById(req.user._id);
        
        const decryptedUserKey = decryptUserKey(user.key);

        if(decryptedUserKey === enteredKey){
            return res.status(200).json({decryptedUserKey});
        } else {
            return res.status(401).send('User unauthorised');
        }
    } catch (error) {
        console.log('Error ',error.message);
    }
}
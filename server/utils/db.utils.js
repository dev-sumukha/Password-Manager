const mongoose = require('mongoose');

const connectDB = async function(){
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log('Database connected successfully');
    } catch (e) {
        console.log('Something went wrong ',e);
        process.exit(1);
    }
}

module.exports = connectDB;
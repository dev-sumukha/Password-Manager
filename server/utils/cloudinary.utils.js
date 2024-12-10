const { v2 } = require('cloudinary');
const fs = require('fs');


v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath){
            console.log('Invalid file path');
            return null;
        }

        // Upload file to cloudinary
        const response = await v2.uploader.upload(localFilePath,{
            resource_type: 'image'
        });

        console.log('File uploaded on Cloudinary');

        // fs.unlinkSync(localFilePath);

        return response.url;
    } catch (error) {
        console.error('Error uploading',error.message);

        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
        }
    }
}

module.exports = uploadOnCloudinary;
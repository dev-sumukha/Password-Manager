const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const uploadPath = path.join(__dirname,'../public/temp');
        console.log('Uploading to multer');
        cb(null,uploadPath);
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload = multer({storage:storage});

module.exports = upload;
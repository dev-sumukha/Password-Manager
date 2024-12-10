const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers');

const { authMiddleware } = require('../middlewares/auth.middlewares');
const upload = require('../middlewares/multer.middlewares');

router.post('/signup',upload.single('profilePicUrl'),userController.register);
router.post('/login',userController.login);
router.get('/profile',authMiddleware,userController.profile);
router.post('/showKey',authMiddleware,userController.showKey);

module.exports = router;
const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/auth.middlewares');

const passwordController = require('../controllers/password.controllers');

router.post('/addPassword',authMiddleware,passwordController.addPassword);
router.post('/showPasswords',authMiddleware,passwordController.showPasswords);
router.get('/getPasswords',authMiddleware,passwordController.getPasswords);

module.exports = router;
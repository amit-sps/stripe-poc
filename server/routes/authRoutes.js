const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValiddation = require("../controllers/validations/user.validation");
const { authenticated } = require('../middleware/authMiddleware');

router.post('/register',authValiddation.registerValidation, authController.register);
router.post('/login',authValiddation.loginValidation, authController.login);
router.get('/profile',authenticated, authController.getProfile)
router.get('/customer/portal',authenticated, authController.getCustomerPortalLink)

module.exports = router;

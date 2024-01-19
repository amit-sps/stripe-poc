const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { authenticated } = require('../middleware/authMiddleware');

router.get('/orders', authenticated, checkoutController.createOrder);

module.exports = router;

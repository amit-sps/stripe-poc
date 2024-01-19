const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticated } = require('../middleware/authMiddleware');

router.get('/',authenticated, cartController.getCartByUserId);
router.patch('/add', authenticated, cartController.addToCart);
router.delete('/remove/:cartId', authenticated, cartController.removeFromCart);
router.put('/quantity/inc/:cartId',authenticated,cartController.incQuantity)
router.put('/quantity/desc/:cartId',authenticated,cartController.descQuantity)

module.exports = router;

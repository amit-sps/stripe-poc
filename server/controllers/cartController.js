const { sendResponse } = require("../helper/response");
const Cart = require("../models/Cart");
const cartService = require("../services/Cart");

exports.getCartByUserId = async (req, res) => {
  try {
    const carts = await cartService.getCartByUserId(req.user._id);
    return sendResponse(res, true, 200, "Carts list.", { carts });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) {
      return sendResponse(res, false, 400, "Product id is required.");
    }
    const carts = await cartService.addToCart(req.user._id, product);
    return sendResponse(res, true, 200, "Added to cart.", { carts });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const {cartId} = req.params;
    await cartService.removeToCart(req.user._id,cartId);
    return sendResponse(res, true, 200, "Removed from cart.");
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.incQuantity = async (req, res) => {
  try {
    const {cartId} = req.params;
    await cartService.increaseQuantity(req.user._id,cartId);
    return sendResponse(res, true, 200, "Quantity increased.");
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.descQuantity = async (req, res) => {
  try {
    const {cartId} = req.params;
    await cartService.decreaseQuantity(req.user._id,cartId);
    return sendResponse(res, true, 200, "Quantity decreased.");
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};
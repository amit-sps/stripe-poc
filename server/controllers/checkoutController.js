const { sendResponse } = require("../helper/response");
const Order = require("../models/Order");
const stripeService = require("../services/Stripe");

exports.createOrder = async (req, res) => {
  try {
    const checkoutSessionUrl = await stripeService.createStripeCheckout(req.user._id);
    return sendResponse(res, true, 200, "Checkout created.", { url:checkoutSessionUrl });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};


const { sendResponse } = require("../helper/response");
const messService = require("../services/Mess");
const stripeService = require("../services/Stripe");

exports.getMess = async (req, res) => {
  try {
    const mess = await messService.getAllMess();
    return sendResponse(res, true, 200, "Mess list.", {
      mess,
    });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.joinMessById = async (req, res) => {
  try {
    const joinMessCheckoutUrl = await stripeService.createMessCheckout(
      req.user._id,
      req.params._id
    );
    return sendResponse(res, true, 200, "Checkout created.", {
      url: joinMessCheckoutUrl,
    });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

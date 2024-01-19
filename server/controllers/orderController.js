const orderService = require("../services/Order");
const { sendResponse } = require("../helper/response");
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user._id);
    return sendResponse(res, true, 200, "My orders.", {
      orders,
    });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

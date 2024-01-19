const Order = require("../models/Order");

exports.getOrdersByUserId = async (userId) => {
  try {
    return await Order.find({ user: userId }).sort({ createdAt: -1 }).lean();
  } catch (error) {
    throw new Error(error);
  }
};

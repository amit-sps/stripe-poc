const Router = require("express").Router();
const { authenticated } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

Router.get("/", authenticated, orderController.getMyOrders);

module.exports = Router;

const Router = require("express").Router();
const messController = require("../controllers/messController");
const { authenticated } = require("../middleware/authMiddleware");

Router.get("/", messController.getMess);
Router.post("/join/:_id", authenticated, messController.joinMessById);
module.exports = Router;

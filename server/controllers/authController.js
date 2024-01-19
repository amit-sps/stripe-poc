const authService = require("../services/User");
const { sendResponse } = require("../helper/response");
const bcrypt = require("bcrypt");
const stripeService = require("../services/Stripe");

exports.register = async (req, res) => {
  try {
    const { username, email, phoneNumber } = req.validated;
    if (!username || !email || !phoneNumber) {
      throw new Error("Username, email & phone number are required.");
    }
    const salt = await bcrypt.genSalt(10);
    req.validated.password = await bcrypt.hash(req.validated.password, salt);
    if (await authService.isExist({ username, email, phoneNumber })) {
      throw new Error(
        "User already exist with given username, email or phone number."
      );
    }
    const { id: stripeCustomer } = await stripeService.createStripeCustomer({
      name: username,
      email,
    });
    // Creating user's stripe account
    req.validated.stripeCustomer = stripeCustomer;
    const user = await authService.register(req.validated);
    const token = await authService.generateJWTToken(
      { _id: user._id },
      process.env.JWT_SECRET,
      "1d"
    );
    delete user._doc.password;
    return sendResponse(res, true, 201, "Registration successfull.", {
      user,
      token,
    });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.validated;

    const user = await authService.getUserByUsername(username);

    if (!user) {
      throw new Error("Account does not exist.");
    }

    const isPasswordValid = await authService.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }

    const token = await authService.generateJWTToken(
      { _id: user._id },
      process.env.JWT_SECRET,
      "1d"
    );
    delete user.password;

    return sendResponse(res, true, 200, "Login successful.", { user, token });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await authService.getProfileById(req.user._id);
    return sendResponse(res, true, 200, "Profile get successfully.", { user });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
};


exports.getCustomerPortalLink = async (req,res)=>{
  try {
    const checkoutSessionUrl = await stripeService.createCustomerPortal(req.user._id);
    return sendResponse(res, true, 200, "Checkout created.", { url:checkoutSessionUrl });
  } catch (error) {
    return sendResponse(res, false, 400, error.message);
  }
}
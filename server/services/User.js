const UserModel = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (data) => {
  try {
    const newUser = new UserModel(data);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.isExist = async (payload) => {
  return (await UserModel.findOne(payload).lean()) ? true : false;
};

exports.getUserByUsername = async (username) => {
  return await UserModel.findOne({ username }).lean();
};

exports.verifyPassword = async (password,userPassword) => {
return await bcrypt.compare(password, userPassword);
}

exports.generateJWTToken = async (payload, secretKey, expiresIn = "1h") => {
  try {
    const token = JWT.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("JWT generation error:", error);
    throw error;
  }
};

exports.getProfileById = async(id)=>{
  return UserModel.findById(id).select("-password").lean();
}

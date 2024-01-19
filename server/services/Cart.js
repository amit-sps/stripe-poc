const Cart = require("../models/Cart");
const mongoose = require("mongoose");

exports.addToCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId, 'products.productId': productId });

    if (cart) {
      throw new Error('Product already exists in the cart');
    }
    return Cart.findOneAndUpdate(
      { userId },
      { $push: { products: { productId } } },
      { upsert: true, new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.removeToCart = async (userId, productId) => {
  try {
    return await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.increaseQuantity = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId, 'products.productId': productId });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const productIndex = cart.products.findIndex(
      (product) => String(product.productId) === String(productId)
    );

    if (productIndex === -1 || cart.products[productIndex].quantity === 10) {
      return cart;
    }

    return await Cart.findOneAndUpdate(
      { userId, 'products.productId': productId },
      { $inc: { 'products.$.quantity': 1 } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

exports.decreaseQuantity = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId, 'products.productId': productId });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const productIndex = cart.products.findIndex(
      (product) => String(product.productId) === String(productId)
    );

    if (productIndex === -1 || cart.products[productIndex].quantity === 1) {
      return cart;
    }

    return await Cart.findOneAndUpdate(
      { userId, 'products.productId': productId },
      { $inc: { 'products.$.quantity': -1 } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};


exports.getCartByUserId = async (userId) => {
  try {
    return await Cart.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productsInfo",
        },
      },
      {
        $addFields: {
          product: { $arrayElemAt: ["$productsInfo", 0] },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          products: {
            $push: {
              $mergeObjects: ["$product", { quantity: "$products.quantity" }],
            },
          },
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }
};


exports.clearCartByUserId = async (userId) => {
  try {
    return await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

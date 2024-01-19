const Mess = require("../models/Mess");
const Order = require("../models/Order");
const User = require("../models/User");
const cartService = require("./Cart");

const stripe = require("stripe")(process.env.SECRET_KEY);

exports.createStripeCustomer = async (userDetails) => {
  try {
    return await stripe.customers.create(userDetails);
  } catch (error) {
    throw new Error(error);
  }
};

exports.createCustomerPortal = async (userId) => {
  try {
    const userDetails = await User.findById(userId).lean();

    const existingConfigs = await stripe.billingPortal.configurations.list();
    let billingConfig;

    // Check if configuration already exists
    if (existingConfigs.data.length === 0) {
      billingConfig = await stripe.billingPortal.configurations.create({
        // Define your configuration options here
        business_profile: {
          privacy_policy_url: "http://google.com/privacy",
          terms_of_service_url: "http://google.com/terms",
        },
        features: {
          invoice_history: {
            enabled: true,
          },
          payment_method_update: {
            enabled: true,
          },
          subscription_pause: {
            enabled: true,
          },
          subscription_cancel: {
            enabled: true,
          },
        },
      });
    } else {
      billingConfig = existingConfigs.data[0];
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: userDetails.stripeCustomer,
      return_url: "http://localhost:3001/",
      configuration: billingConfig.id,
    });
    return session.url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.createStripeCheckout = async (userId) => {
  try {
    const userDetails = await User.findById(userId).lean();

    const carts = await cartService.getCartByUserId(userId);

    const products = carts[0].products;

    // converting the products information in the required format.
    const checkoutData = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: checkoutData,
      mode: "payment",
      success_url: "http://localhost:3001/orders",
      cancel_url: "http://localhost:3001/",
      customer: userDetails.stripeCustomer,
      billing_address_collection: "auto",
      metadata: { userId }, //You can attached the metadata for handle the Webhook
    });

    return session.url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.createMessCheckout = async (userId, messId) => {
  try {
    const userDetails = await User.findById(userId).lean();
    const messDetails = await Mess.findById(messId).lean();

    const checkoutData = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: messDetails.messType,
            images: [messDetails.image],
          },
          recurring: {
            interval: "month",
          }, //This field is required for subscription mode
          unit_amount: messDetails.amount * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      line_items: checkoutData,
      mode: "subscription",
      success_url: "http://localhost:3001/",
      cancel_url: "http://localhost:3001/",
      customer: userDetails.stripeCustomer,
      billing_address_collection: "auto",
      metadata: { userId, messId },
    });

    return session.url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.stripeWebhook = async (req, res) => {
  switch (req.body.type) {
    case "checkout.session.completed":
      const { amount_total, payment_status, mode } = req?.body?.data?.object;
      const { userId } = req?.body?.data?.object?.metadata;
      if (userId && amount_total && mode == "payment") {
        const carts = await cartService.getCartByUserId(userId);
        const products = carts[0].products;
        await Order.create({
          user: userId,
          items: products,
          totalAmount: amount_total / 100,
          payment_status,
        });
        await cartService.clearCartByUserId(userId);
      }
      break;

    default:
      break;
  }
  res.status(200).json({ received: true });
};
